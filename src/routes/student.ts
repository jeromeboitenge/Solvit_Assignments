import { db } from "../../database"

import express, { Router } from "express";
import { createStudent, deleteStudent, getAllStudents, getStudent } from "../controllers/studentController";

const studentRouter: Router = express().router

studentRouter.post("/students", createStudent)
studentRouter.get("/students", getAllStudents)
studentRouter.get("/students/:studentId", getStudent)
studentRouter.delete("/students/:studentId", deleteStudent)

export { studentRouter }