import { Request, Response } from "express";
import {
    markAttendance,
    getAttendanceForStudent,
    allAttendance,
    updateAttendance,
    deleteAttendance
} from "../services/attendance.service";

// Create attendance
export const setAttendance = (req: Request, res: Response) => {
    const { studentId, status } = req.body;
    if (!studentId || !status) return res.status(400).json({ message: "Missing studentId or status" });

    const attendance = markAttendance({ studentId, status });
    if (!attendance) return res.status(404).json({ message: "Student not found" });

    res.status(201).json({ message: "Attendance recorded", data: attendance });
};

// Get attendance for a student
export const getStudentAttendance = (req: Request, res: Response) => {
    const { studentId } = req.params;
    const attendance = getAttendanceForStudent(studentId);
    res.status(200).json({ message: "Attendance fetched", data: attendance });
};

// Get all attendance, with optional filter
export const getAllAttendance = (req: Request, res: Response) => {
    const { status } = req.query; // ?status=present or ?status=absent
    let attendance = allAttendance();

    if (status === "present" || status === "absent") {
        attendance = attendance.filter((record: any) => record.status === status);
    }

    res.status(200).json({ message: "Attendance fetched", data: attendance });
};

// Update attendance
export const editAttendance = (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Missing status" });

    const updated = updateAttendance(id, status);
    if (!updated) return res.status(404).json({ message: "Attendance not found" });

    res.status(200).json({ message: "Attendance updated", data: updated });
};

// Delete attendance
export const removeAttendance = (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = deleteAttendance(id);
    if (!deleted) return res.status(404).json({ message: "Attendance not found" });

    res.status(200).json({ message: "Attendance deleted", data: deleted });
};
