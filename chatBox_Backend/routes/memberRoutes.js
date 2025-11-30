import express from "express";
import {
  updateMember,
  deleteMember,
  getAllMembers,
  getMemberById,
} from "../controllers/memberController.js";
import { authorizeMemberDeletion } from "../middlewares/authorizeMember.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.delete(
  "/deleteMember/:id",
  authenticate,
  authorizeMemberDeletion,
  deleteMember
);
router.put(
  "/updateMember/:id",
  authenticate,
  authorizeMemberDeletion,
  updateMember
);

router.get("/members", getAllMembers);
router.get("/member/:id", getMemberById);

export default router;
