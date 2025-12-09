
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
export const getStudentById = (studentId: string) => {
    const foundIndex = db.findIndex((va) => va.id === studentId);
    if (foundIndex === -1) {
        return 0
    }
    return db[foundIndex]
}
export const deletedStudentById = (studentId: string) => {
    const studentIndex = db.findIndex(ide => ide.id === studentId)
    if (studentIndex === -1) {
        return false

    }
    return db.splice(studentIndex, 1);
}