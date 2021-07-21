import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const getusers = async (req, res) => {
  try {
    const users = await UserModal.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
};

export const singleuser = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) return res.json({ message: " Unauthenticated" })

    const user = await UserModal.findById(id);
    res.status(203).json(user)

  } catch (error) {
    res.status(403).send(error)
  }
};


export const followusers = async (req, res) => {

  try {
    const { id } = req.params

    if (!id) return res.json({ message: " Unauthenticated" })
    //  current user
    const user = await UserModal.findById(id);

    // other user
    const otheruser = await UserModal.findById(req.body.userId)


    const index = user.following.findIndex((user) =>
      user.userId === String(otheruser._id))


    if (index === -1) {
      user.following.push(req.body);
    }
    else {
      user.following = user.following.filter((user) => user.userId !== String(otheruser._id))
    }

    const updatedUser = await UserModal.findByIdAndUpdate(id, user, { new: true })

    res.json(updatedUser)

  } catch (error) {
    res.status(403).json(error)
  }
};

export const getfollowing = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) return res.json({ message: " Unauthenticated" })

    const user = await UserModal.findById(id);
    res.status(203).json(user.following)

  } catch (error) {
    res.status(403).send(error)
  }
}


export const updateuser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await UserModal.findById(id);
    const {_id, following, password} = user
    // now, update the user with the req.body
    const { about, interests, image, name, email } = req.body
    const updatedUser = { _id, following, password, about, interests, image, name, email}

    await UserModal.findByIdAndUpdate(id, updatedUser, { new: true })
    res.json(updatedUser);
  } catch (error) {
    console.log(error)
  }
}