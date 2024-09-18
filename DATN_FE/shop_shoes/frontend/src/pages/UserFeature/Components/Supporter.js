import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AxiosClient from "../../../networks/AxiosClient";
import {
  selectLstOnlineUsers,
  selectUserInfo,
} from "../../../redux/slices/usersSlice";
import { socket } from "../../../App";
import TimeAgo from "../../../components/TimeAgo";
import { ROLE_TYPES } from "../../../constants";
import EmojiPicker from "emoji-picker-react";
import { Button, Popover } from "antd";

export default function Supporter() {
  const selUserInfo = useSelector(selectUserInfo);
  const selLstOnlineUsers = useSelector(selectLstOnlineUsers);
  const [conversation, setConversation] = useState();
  const [messages, setMessages] = useState([]);

  const [contentsInput, setContentsInput] = useState("");
  const [receiverId, setReceiverId] = useState();
  console.log("receiverId", receiverId);
  console.log("selLstOnlineUsers", selLstOnlineUsers);
  useEffect(() => {
    if (selLstOnlineUsers && selUserInfo) {
      (async () => {
        const lstConversations = await AxiosClient.post(
          "/conversations/lst-conversations"
        );
        const conversation = lstConversations.data?.[0] || {};
        if (conversation && Object.values(conversation).length > 0) {
          const receiverKey =
            conversation["senderId"] == selUserInfo?.userId
              ? "receiverId"
              : "senderId";
          setReceiverId(conversation[receiverKey]);

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
        } else {
          const lstReceivers = selLstOnlineUsers.filter(
            (user) => user.roles === ROLE_TYPES.MEMBERSHIP && user.online
          );
          console.log("lstReceivers", lstReceivers);
          if (Array.isArray(lstReceivers) && lstReceivers.length > 0) {
            const randomUsers =
              lstReceivers[
                Math.round(Math.random() * (lstReceivers.length - 1))
              ];
            console.log("randomUsers", randomUsers);
            setReceiverId(randomUsers?.userId);
          }
        }
      })();
    }
  }, [selLstOnlineUsers, selUserInfo]);

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
    return selLstOnlineUsers?.find((users) => users?.userId === receiverId);
  }, [selLstOnlineUsers, receiverId]);

  console.log("userReceive", userReceive);

  const isSupporterOnline = useMemo(() => userReceive?.online, [userReceive]);

  const sendMessages = async () => {
    const resultMessage = await AxiosClient.post("/conversations/add-message", {
      contents: contentsInput,
      receiverId: receiverId,
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
  const handleEmojiClick = (emojiData) => {
    setContentsInput((pre) => pre + emojiData.emoji);
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
        <Popover
          placement="top"
          title={"text"}
          content={<EmojiPicker onEmojiClick={handleEmojiClick} />}
        >
          <Button>Icons</Button>
        </Popover>
        <button onClick={sendMessages}>Gửi</button>
      </div>
    </div>
  );
}
