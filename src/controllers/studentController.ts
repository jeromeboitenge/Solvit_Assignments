import { db } from "../../database";
import { Request, Response } from "express";
import { studentRouter } from "../routes/student";
import { CreateStudentsRequest, GetStudentIdParamsReq } from "../types/student.interface";
import { createUser, allStudent, findStudent, deletedStudentById } from "../services/student.service";

export const createStudent = (req: CreateStudentsRequest, res: Response) => {
    try {
        const { name, age, isActive } = req.body;
        if (!name || !age || !isActive) {
            return res.status(400).json({
                message: "Your missing field",
            });
        }
        createUser({ name, age, isActive })
        res.status(201).json({
            Message: "student have been created successfuly",
        });
    } catch (error) {
        const { message, stack } = error as Error;
        res.status(500).json({
            message,
            stack,
        });
    }
};

export const getAllStudents = (req: Request, res: Response) => {
    const allStudents = allStudent()

    res.status(200).json({
        data: allStudents,
        message: "fetched well",
    });
};
export const getStudent = (req: GetStudentIdParamsReq, res: Response) => {
    const { studentId } = req.params;



    const student = findStudent({ studentId });
    res.status(200).json({
        message: "student Found",
        data: student,
    });
};
export const deleteStudent = (req: Request, res: Response) => {
    const { studentId } = req.params

    const deletedStudent = deletedStudentById(studentId)
    res.status(200).json({
        message: "student successfuly deleted",
        deleted: deletedStudent
    })
}
export const updateStudent = (req: Request, res: Response) => {
    const { id } = req.params
    const studentIndex = db.findIndex(ide => ide.id === id)
    if (studentIndex === -1) {
        res.status(404).json({
            message: "student not found,check well your id"
        })

    }

}