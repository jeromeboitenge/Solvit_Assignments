import express, { Router } from "express";
import { studentRouter } from "./student";
import { attendanceRouter } from "./attendance.router";
import { userRouter } from "./userRoutes";

const routes: Router[] = [
    studentRouter,
    attendanceRouter,
    userRouter
];

const mainRouter = express();

routes.forEach((router) => {
    mainRouter.use(router);
});

export { mainRouter };
