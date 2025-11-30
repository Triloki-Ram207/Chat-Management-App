import express from "express";
import { createOrUpdateUser } from "../controllers/registerUser.js";

const router = express.Router();

router.post("/createUser", createOrUpdateUser);

export default router;
