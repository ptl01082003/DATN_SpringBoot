import { Button, Image, Popover, Upload } from "antd";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../../App";
import TimeAgo from "../../../components/TimeAgo";
import { ROLE_TYPES, URL_IMAGE } from "../../../constants";
import AxiosClient from "../../../networks/AxiosClient";
import {
  selectLstOnlineUsers,
  selectUserInfo,
} from "../../../redux/slices/usersSlice";
import { FolderOpenOutlined, PlusOutlined } from "@ant-design/icons";

export default function Supporter() {
  const selUserInfo = useSelector(selectUserInfo);
  const selLstOnlineUsers = useSelector(selectLstOnlineUsers);
  const [messages, setMessages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [openUploadImage, setOpenUploadImage] = useState(false);
  const [contentsInput, setContentsInput] = useState("");
  const [receiverId, setReceiverId] = useState();

  const handleChange = async ({ fileList: newFileList }) => {
    const images = newFileList[0];
    setFileList(newFileList);
    if (images?.status === "done") {
      const resultMessage = await AxiosClient.post(
        "/conversations/add-message",
        {
          imageUrl: images?.response?.data?.[0],
          receiverId: receiverId,
        }
      );
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

      setOpenUploadImage(false);

      setFileList([]);

      goToMessagesNodeById(resultMessage?.data?.messagesId);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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

          if (Array.isArray(messages) && messages.length > 0) {
            const lastMessages = messages[messages.length - 1];
            goToMessagesNodeById(lastMessages?.messagesId);
          }
        } else {
          const lstReceivers = selLstOnlineUsers.filter(
            (user) => user.roles === ROLE_TYPES.MEMBERSHIP && user.online
          );
          if (Array.isArray(lstReceivers) && lstReceivers.length > 0) {
            const randomUsers =
              lstReceivers[
                Math.round(Math.random() * (lstReceivers.length - 1))
              ];
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
      <div className="w-full overflow-y-auto flex-1 p-4 space-y-3">
        {messages?.map((message) => {
          const isReceiver = selUserInfo?.userId != message?.userId;
          return (
            <div
              key={message?.createdAt}
              id={`messages-${message?.messagesId}`}
            >
              {isReceiver ? (
                message?.imageUrl ? (
                  <div className="flex justify-start">
                    <div className="w-full max-w-xs p-2 bg-slate-200 rounded-lg">
                      <Image src={URL_IMAGE(message?.imageUrl)} />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-start">
                    <div className="p-4 inline-block rounded-lg min-w-[15%] max-w-[70%] bg-slate-200">
                      {message?.contents}
                    </div>
                    <h1 className="mt-1 text-xs italic">
                      <TimeAgo time={message?.createdAt}></TimeAgo>
                    </h1>
                  </div>
                )
              ) : message?.imageUrl ? (
                <div className="flex justify-end">
                  <div className="w-full max-w-xs p-2 bg-orange-200 rounded-lg">
                    <Image src={URL_IMAGE(message?.imageUrl)} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-end">
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
      <div className="w-full sticky right-0 bottom-0 flex items-center gap-4 px-3 py-4 border-t">
        <input
          value={contentsInput}
          onChange={(e) => setContentsInput(e.target.value)}
          className="flex-1 px-3 py-2 outline-none"
          placeholder="Nhập tại đây"
        />
        <Popover
          placement="top"
          title={"Biểu cảm"}
          content={<EmojiPicker onEmojiClick={handleEmojiClick} />}
        >
          <Button>Icons</Button>
        </Popover>
        <Popover
          placement="top"
          open={openUploadImage}
          title={"Upload hình ảnh"}
          content={
            <div className="w-[100px]">
              <Upload
                action="http://localhost:5500/api/v1/uploads/multiple"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          }
        >
          <button
            className="px-4 py-2 bg-blue-100 rounded-lg"
            onClick={() => {
              setOpenUploadImage((x) => !x);
            }}
          >
            <FolderOpenOutlined />
          </button>
        </Popover>
        <button
          className="py-2 min-w-[100px] bg-orange-200 rounded-lg"
          onClick={sendMessages}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
