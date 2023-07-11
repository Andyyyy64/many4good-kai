import express from "express"
import cors from "cors"
import authRouter from "./routes/authRoutes";
import acountingRouter from "./routes/acountingRoutes";
import dotenv from "dotenv"

dotenv.config();
const app: express.Express = express();
const PORT: number = Number(process.env.PORT) || 6465;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/acounting', acountingRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})