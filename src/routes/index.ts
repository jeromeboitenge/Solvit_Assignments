import express, { Router } from "express";
import { studentRouter } from "./student";
import { attendanceRouter } from "./attendance.router";

const routes: Router[] = [
    studentRouter,
    attendanceRouter
];

const mainRouter = express();

routes.forEach((router) => {
    mainRouter.use(router);
});

export { mainRouter };
