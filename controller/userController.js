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
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({ message: "Invalid or missing Data" });
    }
    const isAuthUser = await getUserbyMail(email);
    if (isAuthUser) {
      return res
        .status(409)
        .json({ message: "User already exist please login" });
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);
    return res
      .status(201)
      .json({ message: "User Created Sucessfully", newUser });
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
    const delUser = await deleteUser(isValid.id);
    return res.status(209).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const isValid = await getUserById(id);
    if (!isValid) {
      return res.status(404).json({ message: "User not exist in the db" });
    }
    const user=await updateUser(id,name,email);
    return res.status(200).json({message:"User Created Successfully",user})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
