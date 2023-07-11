import { Request, Response } from "express";
import db from "../utils/database"

type ExpensesType = {
    id: number;
    user_id: number;
    name: string;
    cost: number;
    is_food: boolean;
    date: Date;
}

export const getExpensesData = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;

    // get expenses from db
    try {
        const expenses: ExpensesType[] | any = await db.all("SELECT * FROM expenses WHERE user_id = $1", [user_id]);
        res.status(200).json({ expenses: expenses });
    } catch(err: any) {
        console.log(err.message);
        res.status(400).json({ message: err });
    }        
}

export const addExpensesData = async (req: Request, res: Response): Promise<void> => {
    const { user_id, name, cost, is_food } = req.body;

    // add expenses to db
    try {
        await db.run("INSERT INTO expenses (user_id, name, cost, is_food) VALUES ($1, $2, $3, $4)", [user_id, name, cost, is_food]);
        res.status(200).json({ message: "Expenses added" });
        console.log("Expenses added");
    } catch(err: any) {
        console.log(err.message);
        res.status(400).json({ message: err });
    }
}

export const deleteExpensesData = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    // delete expenses from db
    try {
        await db.run("DELETE FROM expenses WHERE id = $1", [id]);
        res.status(200).json({ message: "Expenses deleted" });
    } catch(err: any) {
        console.log(err.message);
        res.status(400).json({ message: err });
    }
}

export const changeExpensesData = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, cost, is_food } = req.body;

    // change expenses in db
    try {
        await db.run("UPDATE expenses SET name = $1, cost = $2, is_food = $3 WHERE id = $4", [name, cost, is_food, id]);
        res.status(200).json({ message: "Expenses changed" });
    } catch(err: any) {
        console.log(err.message);
        res.status(400).json({ message: err });
    }
}