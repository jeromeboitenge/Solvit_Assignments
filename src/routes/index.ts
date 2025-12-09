import express, { Router } from "express";
import { studentRouter } from "./student";

const routes: Router[] = [studentRouter];
const mainRouter = express();
mainRouter.use(routes);
export { mainRouter };