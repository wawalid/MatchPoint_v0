// Importaciones
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI;

const cookieOptions = {
  httpOnly: process.env.NODE_ENV === "production",
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  // console.log("token en el backend", token);

  let db_connection = "🔴 BD no conectada";
  if (process.env.MONGODB_URI?.startsWith("mongodb+srv://")) {
    db_connection = "🟢 BD conectada a Atlas";
  } else {
    db_connection = "🟠 BD conectada a Local";
  }


  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "User not found" });


    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      premium: userFound.premium,
      createdAt: userFound.createdAt,
      db_connection: db_connection,
    });
  });
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username });
    if (userFound) return res.status(400).json(["username is already in use"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    await userSaved.save();

    const token = await createAccessToken({
      id: userSaved._id,
      is_admin: userSaved.is_admin,
    });
    res.cookie("token", token, cookieOptions);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      premium: userSaved.premium,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username });
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Invalid password"]);

    const token = await createAccessToken({
      id: userFound._id,
      is_admin: userFound.is_admin,
    });
    res.cookie("token", token, cookieOptions);

    res.json({
      id: userFound._id,
      username: userFound.username,
      premium: userFound.premium,

      // email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    ...cookieOptions,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    fullname: userFound.fullname,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const updateUser = async (req, res) => {
  const { username, email, password, dni } = req.body;
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  if (fullname) userFound.fullname = fullname;
  if (email) userFound.email = email;
  if (password) userFound.password = await bcrypt.hash(password, 10);
  if (dni !== undefined) userFound.dni = dni;
  if (cuenta_bancaria !== undefined)
    userFound.cuenta_bancaria = cuenta_bancaria;
  if (identidad !== undefined) userFound.identidad = identidad;

  userFound.completado = Boolean(
    userFound.dni && userFound.cuenta_bancaria && userFound.identidad
  );
  const updatedUser = await userFound.save();

  return res.json({
    id: updatedUser._id,
    fullname: updatedUser.fullname,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  });
};
