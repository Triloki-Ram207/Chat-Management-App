import express from "express";
import {
  updateChatBoxConfig,
  getChatBoxConfig,
} from "../controllers/settings.js";

const router = express.Router();

router.put("/chatBoxUi", updateChatBoxConfig);
router.get("/getChatBoxUi", getChatBoxConfig);

export default router;
