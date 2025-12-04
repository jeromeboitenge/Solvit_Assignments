let students=[
    {id:1,firstName:'jerome',lastName:'Nzaramyimana',email:'jeromeboitenge@gmail.com',age:25,gender:'Male',isAvailable: true},
        {id:2,firstName:'boitenge',lastName:'aldrin',email:'boitenge311@gmail.com',age:25,gender:'Female',isAvailable: false}

]

function registerStudent(student){
const newStudent = {
        id: students.length + 1, 
        firstName: student.firstName,
        lastName:student.lastName,
        email:student.email,
        age: student.age,
        gender: student.gender,
        isAvailable: true
       
    }
    students.push(newStudent)

console.log('is successfully registered' )
}
function updateStudent(id,newInfo){
    const studentIndex=students.findIndex(stud=>stud.id=id)
    if(studentIndex!=-1){
        students[studentIndex]={...students[studentIndex],...newInfo}
    console.log(' student is sucessfully updated')
}
else{
    console.log('Student not found')
}
    
}
function setAvailability(id, isAvailable) {
    const student = students.find(stud => stud.id === id);
    if (student) {
        student.isAvailable = isAvailable;
        console.log(`\n[Status] Marked ${student.firstName} as ${isAvailable ? 'Available' : 'Unavailable'}`);
    }
}
function getStudentStatistics() {
    const stats = students.reduce((acc, student) => {
        if (student.gender === 'Male') acc.male++;
        if (student.gender === 'Female') acc.female++;
        if (student.isAvailable) acc.active++;
        else acc.inactive++;
        
        acc.total++;
        return acc;
    }, { male: 0, female: 0, active: 0, inactive: 0, total: 0 });

    return stats;
}

function searchStudents(criteria, sortBy = 'id') {
    let result = students.filter(student => {
        let match = true;
        if (criteria.gender) match = match && student.gender === criteria.gender;
        if (criteria.minAge) match = match && student.age >= criteria.minAge;
        if (criteria.name) match = (match && student.firstName.includes(criteria.name)
            || match && student.lastName.includes(criteria.name));
        return match;
    });
    result.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });

    return result;
}
function getPaginatedStudents(page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const data = students.slice(startIndex, endIndex);
    
    return {
        currentPage: page,
        itemsOnPage: data.length,
        totalItems: students.length,
        totalPages: Math.ceil(students.length / limit),
        data:data
    };
}
function deleteByCriteria(key, value) {
    for (let i = students.length - 1; i >= 0; i--) {
        if (students[i][key] === value) {
            students.splice(i, 1);
        }
    }
    console.log(`Deleted students where ${key} is ${value}`);
}
registerStudent("Frank","Iranzi","iranzi@gmail.com", 25, "Male");
updateStudent(2, { age: 30 });
setAvailability(1, false);
console.log("\n--- STATISTICS ---");
console.log(getStudentStatistics());
console.log("\n--- SEARCH (Males) ---");
console.log(searchStudents({ gender: "Male" }, "age"));
console.log("\n--- PAGINATION (Page 2) ---");
console.log(getPaginatedStudents(2, 2));
deleteByCriteria("isAvailable", false);
console.log("\n--- FINAL LIST ---");
console.log(students);



//Using loops

// function findByNameLoop(searchName) {
//     for (let i = 0; i < students.length; i++) {
//         if (students[i].firstName === searchName ||students[i].lastName === searchName) {
//             return students[i];
//         }
//     }
//     return "Not Found";
// }

// function getStatistics() {
//     let maleCount = 0;
//     let femaleCount = 0;
    
//     for (let i = 0; i < students.length; i++) {
//         if (students[i].gender === "Male") {
//             maleCount++;
//         } else if (students[i].gender === "Female") {
//             femaleCount++;
//         }
//     }
//     return { male: maleCount, female: femaleCount };
// }

// function deleteByIdLoop(idToDelete) {
//     let tempArray = [];
//     let count = 0;

//     for (let i = 0; i < students.length; i++) {
//         if (students[i].id !== idToDelete) {
//             tempArray[count] = students[i]; 
//             count++;
//         }
//     }
//     students = tempArray;
//     console.log(`\nDeleted ID ${idToDelete}`);
// }


// console.log("\nFinding 'Charlie':", findByNameLoop("Charlie"));
// console.log("Stats:", getStatistics());

// deleteByIdLoop(2); 
// console.log("After Deletion:", students);