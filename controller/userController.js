import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  getUserById,
  createUser,
  getUserbyMail,
  updateUser,
  getAllUsers,
  deleteUser,
} from "../model/userModal.js";

export const create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid or missing Data" });
    }
    const isAuthUser = await getUserbyMail(email);
    if (isAuthUser) {
      return res.status(409).json({ message: "User already exist please login" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword, role);
    return res.status(201).json({ message: "User Created Successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ message: "Fetched All Users", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const delUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isValid = await getUserById(id);
    if (!isValid) {
      return res.status(404).json({ message: "User not exist in the db" });
    }
    await deleteUser(isValid.id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isValid = await getUserbyMail(email);
    if (!isValid) {
      return res.status(404).json({ message: "User not found" });
    }
    const decPassword = await bcrypt.compare(password, isValid.password);
    if (!decPassword) {
      return res.status(401).json({ message: "Wrong Password Please reset it" });
    }
    const payload = { userid: isValid.id, role: isValid.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({ message: "User login Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const isValid = await getUserById(id);
    if (!isValid) {
      return res.status(404).json({ message: "User not exist in the db" });
    }
    const user = await updateUser(id, name, email, role);
    return res.status(200).json({ message: "User Updated Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};