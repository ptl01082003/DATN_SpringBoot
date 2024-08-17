import { Router } from "express";
import ConversationController from "../controller/ConversationController";
import { checkAuth } from "../middleware/checkAuth";

const conversationsRouter = Router();

conversationsRouter.use(checkAuth);

conversationsRouter.post("/add-message", ConversationController.addMessages);
conversationsRouter.post("/lst-messages", ConversationController.getMessages);
conversationsRouter.post("/lst-conversations", ConversationController.getConversations);


export default conversationsRouter;
