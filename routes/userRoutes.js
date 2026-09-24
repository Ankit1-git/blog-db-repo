import express from "express";
import {
  create,
  allUsers,
  delUser,
  userUpdate,
} from "../controller/userController.js";
const router = express.Router();

router.post("/create-user", create);
router.patch("/update-user/:id", userUpdate);
router.delete("/del-user/:id", delUser);
router.get("/all-users", allUsers);

export default router;
