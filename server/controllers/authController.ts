import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import db from "../utils/database";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;

type UserType = {
    id: number;
    username: string;
    email: string;
    password: string;
}

const secretKey = process.env.JWT_SECRET_KEY ?? "";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    try {
        if(!validator.isEmail(email)) {
            res.status(401).json({ message: "invalid email address" })
            return;
        }

        const existingUser: UserType = await db.get("SELECT email FROM users WHERE email = $1", [email]);

        if(existingUser) {
            res.status(401).json({ message: "the user already exists" })
            return;
        }

        await db.run("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);

        const user: UserType = await db.get("SELECT id, email FROM users WHERE email = $1", [email]);

        console.log("User registered" + user.email)
        res.status(200).json({ user: { id: user.id, email: user.email }, message: "User registered" })
    } catch(err: any) {
        console.log(err.message)
        res.status(400).json({ message: err })
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        if(!validator.isEmail(email)) {
            res.status(401).json({ message: "invalid email address" })
            return;
        }

        const user: UserType = await db.get("SELECT * FROM users WHERE email = $1", [email]);

        if(!user) {
            console.log("User not found" + email)
            res.status(401).json({ message: "the user does not exist" })
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            console.log("Invalid password" + user.email)
            res.status(401).json({ message: "invalid password" })
            return;
        }

        const token: string = jwt.sign({ id: user.id, email: user.email, username: user.username }, secretKey, { expiresIn: "1w" });

        console.log("User logged in" + user.email)
        res.status(200).json({ token, user: { id: user.id, email: user.email, username: user.username}, message: "User logged in" })
    } catch(err: any) {
        console.log(err.message)
        res.status(400).json({ message: err })
    }
}