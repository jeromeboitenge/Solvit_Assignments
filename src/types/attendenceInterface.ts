export interface Attendance {
    id: string;
    studentId: string;
    status: "present" | "absent";
    date: string;
}