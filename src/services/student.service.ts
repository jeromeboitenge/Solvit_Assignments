

import { database, writeFile } from "../database";
import { StudentInterface } from "../types/student.interface";


const db = JSON.parse(database())
export const createUser = ({ name, age, isActive }: { name: string, age: number, isActive: boolean }) => {

    const index = (db?.students.length + 1).toString()
    db.students.push({
        id: index,
        name,
        age,
        isActive,
        createdAt: new Date()

    })
    writeFile(db)
    return db.students[Number(index)]

}
export const allStudent = (): StudentInterface => {

    const students = db["students"] as StudentInterface

    return students;
}
export const findStudent = ({ studentId }: { studentId: string; }): StudentInterface | boolean => {

    const students = db["students"] as StudentInterface[];
    const studentIndex = students.findIndex((va) => va.id == studentId);
    if (studentIndex === -1) {
        return false;
    }
    return students[studentIndex];
};

export const deletedStudentById = (studentId: string) => {
    const students = db["students"] as StudentInterface[];
    const studentIndex = students.findIndex(ide => ide.id === studentId)
    if (studentIndex === -1) {
        return null

    }
    const deleted = db.students.splice(studentIndex, 1);
    writeFile(db)
    return deleted[0]
}