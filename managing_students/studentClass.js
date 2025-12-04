const crypto = require('crypto');

class StudentService {
    #students;

    constructor() {
        this.#students = [];
    }

    createStudent(data) {
        const newStudent = {
            id: crypto.randomUUID(),
            name: data.name,
            age: data.age,
            gender: data.gender,
            isActive: true
        };
        this.#students.push(newStudent);
        console.log("Student created:", newStudent);
        return newStudent;
    }

    updateStudent(id, newData) {
        const index = this.#students.findIndex(stud => stud.id === id);
        if (index === -1) throw new Error(`Student with ID ${id} not found.`);
        this.#students[index] = { ...this.#students[index], ...newData };
        console.log("Updated student:", this.#students[index]);
        return this.#students[index];
    }

    setStudentAvailability(id, isAvailable) {
        return this.updateStudent(id, { isActive: isAvailable });
    }

    getStatistics() {
        return this.#students.reduce((stats, student) => {
            stats.total++;
            const genderKey = student.gender.toLowerCase();
            stats.genderBreakdown[genderKey] = (stats.genderBreakdown[genderKey] || 0) + 1;
            if (student.isActive) stats.activeCount++;
            else stats.inactiveCount++;
            stats.totalAge += student.age;
            return stats;
        }, {
            total: 0,
            activeCount: 0,
            inactiveCount: 0,
            totalAge: 0,
            genderBreakdown: {}
        });
    }

    findStudents({ filters = {}, sortBy = 'name', sortOrder = 'asc', page = 1, limit = 10 } = {}) {
        let result = [...this.#students];

        if (Object.keys(filters).length > 0) {
            result = result.filter(student => {
                return Object.entries(filters).every(([key, value]) => {
                    if (typeof value === 'string' && typeof student[key] === 'string') {
                        return student[key].toLowerCase().includes(value.toLowerCase());
                    }
                    return student[key] === value;
                });
            });
        }

        // Sorting
        result.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        // Pagination
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginated = result.slice(start, end);

        return { data: paginated, total: result.length };
    }
}

// -------------------------
// TEST
// -------------------------
const manager = new StudentService();

manager.createStudent({ name: "Alice Johnson", age: 20, gender: "female" });
manager.createStudent({ name: "Bob Smith", age: 22, gender: "male" });
manager.createStudent({ name: "Charlie Davis", age: 21, gender: "male" });
manager.createStudent({ name: "Diana Prince", age: 19, gender: "female" });
const evan = manager.createStudent({ name: "Evan Wright", age: 25, gender: "male" });

manager.updateStudent(evan.id, { age: 26, name: "Evan T. Wright" });

console.log("Updated Evan:", manager.findStudents({ filters: { id: evan.id } }).data[0]);
console.log("\nAll Students:");
console.table(manager.findStudents({}).data);

