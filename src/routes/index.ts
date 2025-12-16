import express, { Router } from "express";
import { studentRouter } from "./student";
import { attendanceRouter } from "./attendance.router";
import { userRoute } from "./users.Routes";


const routes: Router[] = [
    studentRouter,
    attendanceRouter,
    userRoute

];

const mainRouter = express();

routes.forEach((router) => {
    mainRouter.use(router);
});

export { mainRouter };
