import express from "express";
import { getIncomeData, addIncomeData, deleteIncomeData, changeIncomeData } from "../controllers/incomeController";
import { getExpensesData, addExpensesData, deleteExpensesData, changeExpensesData } from "../controllers/expensesController";
import { authMiddleware } from "../middleware/authMiddleware";

const acountingRouter: express.Router = express.Router();

// income
acountingRouter.get("/income/:user_id", authMiddleware, getIncomeData);
acountingRouter.post("/income", authMiddleware, addIncomeData);
acountingRouter.delete("/delete/income/:id", authMiddleware, deleteIncomeData);
acountingRouter.put("/change/income/:id", authMiddleware, changeIncomeData);

// expenses
acountingRouter.get("/expenses/:user_id", authMiddleware, getExpensesData);
acountingRouter.post("/expenses", authMiddleware, addExpensesData);
acountingRouter.delete("/delete/expenses/:id", authMiddleware, deleteExpensesData);
acountingRouter.put("/change/expenses/:id", authMiddleware, changeExpensesData);

export default acountingRouter;