import { Router } from "express";
import {
    setAttendance,
    getStudentAttendance,
    getAllAttendance,
    editAttendance,
    removeAttendance
} from "../controllers/attendance.controller";

const attendanceRouter = Router();

// Create
attendanceRouter.post("/attendance", setAttendance);

// Read
attendanceRouter.get("/attendance", getAllAttendance);
attendanceRouter.get("/attendance/:studentId", getStudentAttendance);

// Update
attendanceRouter.put("/attendance/:id", editAttendance);

// Delete
attendanceRouter.delete("/attendance/:id", removeAttendance);

export { attendanceRouter };
