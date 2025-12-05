import { randomUUID } from "crypto";

enum Status {
    AVAILABLE = "is Available",
    NOT_AVAILABLE = "IsNot Available"
}
type Student = {
    id: string,
    name: string,
    age: number,
    status: Status

}
let students: Student[] = [];

const createStudent = (name: string, age: number, status: Status): Student => {
    const student: Student = {
        id: randomUUID(),
        name,
        age,
        status
    };
    students.push(student);
    return student;
};



const student1 = createStudent("Jerome", 23, Status.AVAILABLE);
console.table(student1);