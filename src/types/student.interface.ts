import { Request } from "express";


export interface StudentInterface {
    id: string;
    name: string;
    age: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
export interface CreateStudentsRequest extends Request {
    body: studentValidationInterface
}
export interface GetStudentIdParamsReq extends Request {
    params: {
        studentId: string
    }
}
export interface studentValidationInterface {
    name: string,
    age: number,
    isActive: boolean
}
