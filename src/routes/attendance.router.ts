import { Router } from "express";
import {
    setAttendance,
    getStudentAttendance,
    getAllAttendance,
    editAttendance,
    removeAttendance
} from "../controllers/attendance.controller";

const attendanceRouter = Router();
attendanceRouter.post("/attendance", setAttendance);
attendanceRouter.get("/attendance", getAllAttendance);
attendanceRouter.get("/attendance/:studentId", getStudentAttendance);
attendanceRouter.put("/attendance/:id", editAttendance);
attendanceRouter.delete("/attendance/:id", removeAttendance);

export { attendanceRouter };
