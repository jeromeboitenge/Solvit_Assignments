import { database, writeFile } from "../database";
import { Attendance } from "../types/attendenceInterface";



export const markAttendance = ({ studentId, status }: { studentId: string; status: "present" | "absent" }) => {
    const db = JSON.parse(database());

    const student = db.students.find((s: any) => s.id === studentId);
    if (!student) return false;

    const index = (db.attendance.length + 1).toString();
    const newRecord: Attendance = {
        id: index,
        studentId,
        status,
        date: new Date().toISOString().split("T")[0],
    };

    db.attendance.push(newRecord);
    writeFile(db);

    return newRecord;
};

export const getAttendanceForStudent = (studentId: string) => {
    const db = JSON.parse(database());
    return db.attendance.filter((record: Attendance) => record.studentId === studentId);
};

export const allAttendance = () => {
    const db = JSON.parse(database());
    return db.attendance;
};

// ✅ Update attendance by ID
export const updateAttendance = (id: string, status: "present" | "absent") => {
    const db = JSON.parse(database());
    const record = db.attendance.find((r: Attendance) => r.id === id);
    if (!record) return false;

    record.status = status;
    writeFile(db);
    return record;
};

// ✅ Delete attendance by ID
export const deleteAttendance = (id: string) => {
    const db = JSON.parse(database());
    const index = db.attendance.findIndex((r: Attendance) => r.id === id);
    if (index === -1) return false;

    const deleted = db.attendance.splice(index, 1)[0];
    writeFile(db);
    return deleted;
};
