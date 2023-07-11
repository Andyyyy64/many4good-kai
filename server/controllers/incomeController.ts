import { Request, Response, } from "express";
import db from "../utils/database"

type IncomeType = {
    id: number;
    user_id: number;
    name: string;
    amount: number;
    date: Date;
}

export const getIncomeData = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.body;

    // get income from db
    try {
        const income: IncomeType[] | any = await db.all("SELECT * FROM income WHERE user_id = $1", [user_id]);
        res.status(200).json({ income: income });
    } catch(err: any) {
        console.log(err.message);
        res.status(400).json({ message: err });
    }
}

export const addIncomeData = async (req: Request, res: Response): Promise<void> => {
    const { user_id, name, amount } = req.body;

    // add income to db
    try {
        await db.run("INSERT INTO income (user_id, name, amount) VALUES ($1, $2, $3)", [user_id, name, amount]);
        res.status(200).json({ message: "Income added" });
        console.log("Income added");
    } catch(err: any) {
        console.log(err.message);
        res.status(400).json({ message: err });
    }
}

export const changeIncomeData = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, amount } = req.body;

    // change income in db
    try {
        await db.run("UPDATE income SET name = $1, amount = $2 WHERE id = $3", [name, amount, id]);
        res.status(200).json({ message: "Income changed" });
    } catch(err: any) {
        console.log(err.message);
        res.status(400).json({ message: err });
    }
}