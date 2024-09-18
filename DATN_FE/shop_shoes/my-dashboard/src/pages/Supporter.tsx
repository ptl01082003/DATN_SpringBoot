import { Avatar, Button, Divider, Image, Popover, Upload } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectLstOnlineUsers, selectUserInfo } from "../app/slice/userSlice";
// import { socket } from "../App";
import EmojiPicker from "emoji-picker-react";
import { socket } from "../App";
import TimeAgo from "../components/TimeAgo";
import { convertTextToShortName } from "../constants/constants";
import AxiosRequestNode from "../networks/AxiosRequestNode";
import { URL_IMAGE } from "../constants";
import { FolderOpenOutlined, PlusOutlined } from "@ant-design/icons";

const ConversationsMessage = ({
  receiverId,
  fullName,
  conversationId,
}: {
  fullName: string;
  receiverId: number;
  conversationId: number;
}) => {
  const selUserInfo = useSelector(selectUserInfo);
  const [contentsInput, setContentsInput] = useState("");
  const selLstOnlineUsers = useSelector(selectLstOnlineUsers);
  const [openUploadImage, setOpenUploadImage] = useState(false);
  const [fileList, setFileList] = useState([]);

  const [messages, setMessages] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const lstMessages = await AxiosRequestNode.post(
        "/conversations/lst-messages",
        { conversationId }
      );
      const messages = lstMessages.data?.messages || [];

      setMessages(messages);

      if (Array.isArray(messages) && messages.length > 0) {
        const lastMessages = messages[messages.length - 1];
        goToMessagesNodeById(lastMessages?.messagesId);
      }
    })();
  }, [conversationId]);

  useEffect(() => {
    socket.on("newMessages", async (data: any) => {
      if (data?.conversationId === conversationId) {
        setMessages((previous) => {
          const mergeData = [...previous, data];
          return mergeData;
        });
        goToMessagesNodeById(data?.messagesId);
      }
    });
  }, [conversationId]);

  const goToMessagesNodeById = (id: number) => {
    setTimeout(() => {
      const node = document.getElementById(`messages-${id}`);
      node && node.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 150);
  };

  const isUserOnline = useMemo(() => {
    return selLstOnlineUsers?.find((onliner) => onliner?.userId === receiverId)
      ?.online;
  }, [selLstOnlineUsers, selUserInfo, receiverId]);

  const sendMessages = async () => {
    const resultMessage = await AxiosRequestNode.post(
      "/conversations/add-message",
      {
        contents: contentsInput,
        receiverId: receiverId,
      }
    );

    socket.emit("newMessages", {
      messages: resultMessage?.data,
      receiverId: receiverId,
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
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleChange = async ({ fileList: newFileList }) => {
    const images = newFileList[0];
    setFileList(newFileList);
    if (images?.status === "done") {
      const resultMessage = await AxiosRequestNode.post(
        "/conversations/add-message",
        {
          imageUrl: images?.response?.data?.[0],
          receiverId: receiverId,
        }
      );
      socket.emit("newMessages", {
        messages: resultMessage?.data,
        receiverId: receiverId,
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

  return (
    <>
      <div className="h-[60px] flex w-full justify-between border-b border-[#000000] items-center px-6">
        <h1>{fullName}</h1>
        <div className="flex items-center space-x-3">
          {isUserOnline ? (
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
      <div className="w-full overflow-y-auto flex-1 p-4 space-y-3">
        {messages?.map((message: any) => {
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
          title={"text"}
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
    </>
  );
};

export default function SupporterPage() {
  const selUserInfo = useSelector(selectUserInfo);
  const selLstOnlineUsers = useSelector(selectLstOnlineUsers);

  const [conversation, setConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState<{
    fullName: string;
    receiverId: number;
    conversationId: number;
  }>();

  useEffect(() => {
    (async () => {
      const lstConversations = await AxiosRequestNode.post(
        "/conversations/lst-conversations"
      );
      setConversation(lstConversations.data || []);
    })();
  }, []);

  useEffect(() => {
    socket.on("newConversations", async () => {
      const lstConversations = await AxiosRequestNode.post(
        "/conversations/lst-conversations"
      );
      setConversation(lstConversations.data || []);
    });
  }, []);

  return (
    <div className="flex gap-6">
      <div className="p-4 w-[300px] rounded-lg border border-[#000000]">
        {Array.isArray(conversation) &&
          conversation.length > 0 &&
          conversation.map((users: any) => {
            const senderKeyName =
              selUserInfo?.userId === users?.receiverId ? "sender" : "receiver";
            const receiverId =
              selUserInfo?.userId === users?.receiverId
                ? users?.senderId
                : users?.receiverId;
            const isUserOnline = selLstOnlineUsers?.find(
              (onliner) => onliner?.userId === receiverId
            )?.online;

            return (
              <>
                <div
                  key={receiverId}
                  className="flex gap-3 cursor-pointer"
                  onClick={() => {
                    setSelectedConversation({
                      receiverId,
                      conversationId: users.conversationId,
                      fullName: users[senderKeyName]?.fullName,
                    });
                  }}
                >
                  <Avatar
                    className="flex-shrink-0"
                    size={"large"}
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    {convertTextToShortName(users?.[senderKeyName]?.fullName)}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="italic">
                        {users?.[senderKeyName]?.fullName}
                      </h3>
                      {isUserOnline ? (
                        <>
                          <div className="w-3 h-3 rounded-full bg-[#008000]"></div>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 rounded-full bg-[#928f8f]"></div>
                        </>
                      )}
                    </div>
                    <h3 className="mb-1 italic line-clamp-1">
                      {users?.lastMessage?.contents}
                    </h3>
                    <h3 className="text-xs">
                      <TimeAgo time={users?.lastMessage?.createdAt} />
                    </h3>
                  </div>
                </div>
                <Divider />
              </>
            );
          })}
      </div>
      <div className="flex flex-1 items-center justify-center flex-col h-[80vh] border border-[#000000] rounded-lg">
        {selectedConversation ? (
          <ConversationsMessage
            fullName={selectedConversation.fullName}
            receiverId={selectedConversation.receiverId}
            conversationId={selectedConversation.conversationId}
          />
        ) : (
          <h1 className="italic">
            Chọn cuộc hội thoại để bắt đầu gửi tin nhắn của bạn
          </h1>
        )}
      </div>
    </div>
  );
}
