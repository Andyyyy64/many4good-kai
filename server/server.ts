import express from "express"
import cors from "cors"
import authRouter from "./routes/authRoutes";
import dotenv from "dotenv"

dotenv.config();
const app: express.Express = express();
const PORT: number = Number(process.env.PORT) || 6464;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})