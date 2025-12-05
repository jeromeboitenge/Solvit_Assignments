"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var Status;
(function (Status) {
    Status["AVAILABLE"] = "is Available";
    Status["NOT_AVAILABLE"] = "IsNot Available";
})(Status || (Status = {}));
var students = [];
var createStudent = function (name, age, status) {
    var student = {
        id: (0, crypto_1.randomUUID)(),
        name: name,
        age: age,
        status: status
    };
    students.push(student);
    return student;
};
var student1 = createStudent("Jerome", 23, Status.AVAILABLE);
console.table(student1);
