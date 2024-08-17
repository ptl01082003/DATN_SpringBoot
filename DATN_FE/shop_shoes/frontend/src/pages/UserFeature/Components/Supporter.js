import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AxiosClient from "../../../networks/AxiosClient";
import {
  selectLstOnlineUsers,
  selectUserInfo,
} from "../../../redux/slices/usersSlice";
import { socket } from "../../../App";
import TimeAgo from "../../../components/TimeAgo";

export default function Supporter() {
  const selUserInfo = useSelector(selectUserInfo);
  const selLstOnlineUsers = useSelector(selectLstOnlineUsers);
  const [conversation, setConversation] = useState();
  const [contentsInput, setContentsInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const lstConversations = await AxiosClient.post(
        "/conversations/lst-conversations"
      );
      const conversation = lstConversations.data?.[0] || {};
      if (conversation) {
        const lstMessages = await AxiosClient.post(
          "/conversations/lst-messages",
          { conversationId: conversation?.conversationId }
        );

        const messages = lstMessages.data?.messages || [];

        setMessages(messages);
        setConversation(conversation);

        if (Array.isArray(messages) && messages.length > 0) {
          const lastMessages = messages[messages.length - 1];
          goToMessagesNodeById(lastMessages?.messagesId);
        }
      }
    })();
  }, []);

  useEffect(() => {
    socket.on("newMessages", async (data) => {
      setMessages((previous) => {
        const mergeData = [...previous, data];
        return mergeData;
      });
      goToMessagesNodeById(data?.messagesId);
    });
  }, []);

  const goToMessagesNodeById = (id) => {
    setTimeout(() => {
      const node = document.getElementById(`messages-${id}`);
      node && node.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 150);
  };

  const userReceive = useMemo(() => {
    return selLstOnlineUsers?.find((onliner) => onliner?.roles === "ADMIN");
  }, [selLstOnlineUsers]);

  const isSupporterOnline = useMemo(() => userReceive?.online, [userReceive]);

  const sendMessages = async () => {
    const resultMessage = await AxiosClient.post("/conversations/add-message", {
      contents: contentsInput,
    });

    socket.emit("newConversations", {
      receiverId: userReceive?.userId,
    });

    socket.emit("newMessages", {
      messages: resultMessage?.data,
      receiverId: userReceive?.userId,
    });

    setMessages((previous) => {
      previous.push(resultMessage?.data);
      return previous;
    });

    setContentsInput("");

    goToMessagesNodeById(resultMessage?.data?.messagesId);
  };

  return (
    <div className="flex flex-col h-[80vh] border border-[#000000] rounded-lg">
      <div>
        <div className="h-[60px] w-full flex justify-between border-b border-[#000000] items-center px-5">
          <h1>Hỗ trợ khách hàng</h1>
          <div className="flex items-center space-x-3">
            {isSupporterOnline ? (
              <>
                <div className="w-3 h-3 rounded-full bg-[#008000]"></div>
                <h1>Đang hoạt động</h1>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-[#928f8f]"></div>
                <h1>Đang offline</h1>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 w-full p-4 space-y-3 overflow-y-auto">
        {messages?.map((message) => {
          const isReceiver = selUserInfo?.userId != message?.userId;
          return (
            <div key={message?.createdAt}>
              {isReceiver ? (
                <div
                  className="flex flex-col items-start"
                  id={`messages-${message?.messagesId}`}
                >
                  <div className="p-4 inline-block rounded-lg min-w-[15%] max-w-[70%] bg-slate-100">
                    {message?.contents}
                  </div>
                  <h1 className="mt-1 text-xs italic">
                    <TimeAgo time={message?.createdAt}></TimeAgo>
                  </h1>
                </div>
              ) : (
                <div
                  className="flex flex-col items-end"
                  id={`messages-${message?.messagesId}`}
                >
                  <div className="p-4 inline-block rounded-lg min-w-[15%] max-w-[70%]  bg-orange-200">
                    {message?.contents}
                  </div>
                  <h1 className="mt-1 text-xs italic">
                    <TimeAgo time={message?.createdAt}></TimeAgo>
                  </h1>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="sticky bottom-0 right-0 flex w-full gap-4 px-3 py-4 border-t">
        <input
          value={contentsInput}
          onChange={(e) => setContentsInput(e.target.value)}
          className="flex-1 px-3 py-2 outline-none"
          placeholder="Nhập tại đây"
        />
        <button onClick={sendMessages}>Gửi</button>
      </div>
    </div>
  );
}
