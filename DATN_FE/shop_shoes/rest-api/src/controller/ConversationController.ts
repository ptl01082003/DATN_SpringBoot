import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Conversations } from "../models/Conversations";
import { Messages } from "../models/Messages";
import { Users } from "../models/Users";
import { Op } from "sequelize";

async function findOrCreateConversation(senderId: number, receiverId: number) {
  let conversation = await Conversations.findOne({
    where: {
      [Op.or]: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });

  if (!conversation) {
    conversation = await Conversations.create({
      senderId: senderId,
      receiverId: receiverId,
    });
  }

  return conversation;
}

const ConversationController = {
  addMessages: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId as number;
      const { contents, imageUrl, receiverId } = req.body;
      const receiver = (await Users.findOne({ where: { roleId: 2 } })) as Users;

      const conversations = await findOrCreateConversation(
        userId,
        receiverId || receiver.userId
      );

      console.log(conversations.conversationId);

      const message = await Messages.create({
        userId,
        contents,
        imageUrl,
        conversationId: conversations.conversationId,
      });

      conversations.lastMessageId = message.messagesId;

      await conversations.save();

      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: {
            ...message.toJSON(),
            conversationId: conversations.conversationId,
          },
          message: `Thêm mới thành công`,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  getConversations: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;

      const lstConversations = await Conversations.findAll({
        where: {
          [Op.or]: [{ senderId: userId }, { receiverId: userId }],
        },
        attributes: ["conversationId", "senderId", "receiverId"],
        include: [
          {
            model: Messages,
            as: "lastMessage",
            attributes: {
              exclude: ["updatedAt", "conversationId"],
            },
            include: [
              {
                model: Users,
                attributes: ["fullName"],
              },
            ],
          },
          {
            model: Users,
            as: "sender",
            attributes: ["fullName"],
          },
          {
            model: Users,
            as: "receiver",
            attributes: ["fullName"],
          },
        ],
      });

      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          message: `Thêm mới thành công`,
          data: lstConversations?.map((conversation) => ({
            ...conversation?.toJSON(),
            messages: conversation.messages?.sort(
              (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
            ),
          })),
        })
      );
    } catch (error) {
      next(error);
    }
  },
  getMessages: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { conversationId } = req.body;

      const lstConversations = await Conversations.findOne({
        where: {
          conversationId,
          [Op.or]: [{ senderId: userId }, { receiverId: userId }],
        },
        attributes: ["conversationId"],
        include: {
          model: Messages,
          as: "messages",
          attributes: {
            exclude: ["conversationId", "updatedAt"],
          },
          include: [
            {
              model: Users,
              attributes: ["fullName"],
            },
          ],
        },
      });

      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          message: `Thêm mới thành công`,
          data: lstConversations,
        })
      );
    } catch (error) {
      next(error);
    }
  },
};

export default ConversationController;
