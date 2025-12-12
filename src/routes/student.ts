import { db } from "../../database"

import express, { Router } from "express";
import { createStudent, deleteStudent, getAllStudents, getStudent } from "../controllers/student.controller";
import { validateStudentData } from "../middlewares/student.middleware";
import { createVaridationSchema } from "../schema/student/joiValidation";

const studentRouter: Router = express().router

studentRouter.post("/students", validateStudentData(createVaridationSchema), createStudent)
studentRouter.get("/students", getAllStudents)
studentRouter.get("/students/:studentId", getStudent)
studentRouter.delete("/students/:studentId", deleteStudent)

export { studentRouter }