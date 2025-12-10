
import { db } from "../../database"
import { database, writeFile } from "../database";
import { StudentInterface } from "../types/student.interface";

export const createUser = ({ name, age, isActive }: { name: string, age: number, isActive: boolean }) => {
    const studentTable = JSON.parse(database())
    const index = (studentTable?.students.length + 1).toString()
    studentTable.students.push({
        id: index,
        name,
        age,
        isActive,
        createdAt: new Date()

    })
    writeFile(studentTable)
    return studentTable.students[Number(index)]

}
export const allStudent = (): StudentInterface => {
    const studentTable = JSON.parse(database())
    const students = studentTable["students"] as StudentInterface

    return students;
}
export const findStudent = ({ studentId }: { studentId: string; }): StudentInterface | boolean => {
    const studentTable = JSON.parse(database())
    const students = studentTable["students"] as StudentInterface[];
    const studentIndex = students.findIndex((va) => va.id == studentId);
    if (studentIndex === -1) {
        return false;
    }
    return students[studentIndex];
};

export const deletedStudentById = (studentId: string) => {
    const studentTable = JSON.parse(database())
    const studentIndex = db.findIndex(ide => ide.id === studentId)
    if (studentIndex === -1) {
        return null

    }
    const deleted = studentTable.splice(studentIndex, 1);
    writeFile(db)
    return deleted[0]
}