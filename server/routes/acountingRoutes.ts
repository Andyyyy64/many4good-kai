import express from "express";
import { getIncomeData, addIncomeData, changeIncomeData } from "../controllers/incomeController";
import { getExpensesData, addExpensesData, changeExpensesData } from "../controllers/expensesController";
import { authMiddleware } from "../middleware/authMiddleware";

const acountingRouter: express.Router = express.Router();

// income
acountingRouter.get("/income", authMiddleware, getIncomeData);
acountingRouter.post("/income", authMiddleware, addIncomeData);
acountingRouter.put("/income/:id", authMiddleware, changeIncomeData);

// expenses
acountingRouter.get("/expenses", authMiddleware, getExpensesData);
acountingRouter.post("/expenses", authMiddleware, addExpensesData);
acountingRouter.put("/expenses/:id", authMiddleware, changeExpensesData);

export default acountingRouter;