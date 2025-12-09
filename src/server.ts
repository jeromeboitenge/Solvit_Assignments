
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config as DotEven } from "dotenv";
DotEven();
import { config } from "./config";
import { mainRouter } from "./routes";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Solvit Africa cohort 2 node js");
});
app.use(config.prefix, mainRouter)
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: "invalid path",
    });
});
export default app;
app.listen(config.port, () => console.log(`serving on port ${config.port}`));
