   // Student prototype
   function Student(name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.registeredSubjects = [];
    this.ratings = [];
}

// Array to store registered students
var students = [];

// Function to register a new student
function registerStudent() {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var age = document.getElementById("age").value;

    var newStudent = new Student(name, surname, age);
    students.push(newStudent);

    document.getElementById("registrationForm").reset();
}

// Function to display student information
function displayStudents() {
    var tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var row = tableBody.insertRow();
        row.insertCell(0).textContent = student.name;
        row.insertCell(1).textContent = student.surname;
        row.insertCell(2).textContent = student.age;
        row.insertCell(3).textContent = student.registeredSubjects.join(", ");
        row.insertCell(4).textContent = student.ratings.join(", ");
    }
}

// Function to enroll a student in a class
function enrollStudent() {
    var selectedStudent = prompt("Enter the name of the student to enroll:");
    var student = findStudentByName(selectedStudent);

    if (student) {
        var subject = prompt("Enter the subject to enroll in:");
        student.registeredSubjects.push(subject);
        displayStudents();
    } else {
        alert("Student not found!");
    }
}

// Function to assign grades to a student
function assignGrades() {
    var selectedStudent = prompt("Enter the name of the student to assign grades:");
    var student = findStudentByName(selectedStudent);

    if (student) {
        var subject = prompt("Enter the subject to assign grades:");
        var grade = prompt("Enter the grade for the subject:");
        student.ratings.push(`${subject}: ${grade}`);
        displayStudents();
    } else {
        alert("Student not found!");
    }
}

// Function to create groups and assign students (using a basic structure)
function createGroups() {
    var group1 = [];
    var group2 = [];

    for (var i = 0; i < students.length; i++) {
        if (i % 2 === 0) {
            group1.push(students[i]);
        } else {
            group2.push(students[i]);
        }
    }

    console.log("Group 1:", group1);
    console.log("Group 2:", group2);
}

// Function to search for a student by name
function findStudentByName(name) {
    for (var i = 0; i < students.length; i++) {
        if (students[i].name === name) {
            return students[i];
        }
    }
    return null;
}

// Function to search for a student by surname
function findStudentBySurname(surname) {
    for (var i = 0; i < students.length; i++) {
        if (students[i].surname === surname) {
            return students[i];
        }
    }
    return null;
}

// Function to get a student's average rating
function getStudentAverage() {
    var selectedStudent = prompt("Enter the name of the student to get the average rating:");
    var student = findStudentByName(selectedStudent);

    if (student) {
        var totalGrades = 0;
        var gradeCount = 0;

        for (var i = 0; i < student.ratings.length; i++) {
            var rating = parseInt(student.ratings[i].split(":")[1].trim());
            if (!isNaN(rating)) {
                totalGrades += rating;
                gradeCount++;
            }
        }

        if (gradeCount > 0) {
            var average = totalGrades / gradeCount;
            alert(`${student.name}'s average rating: ${average.toFixed(2)}`);
        } else {
            alert(`${student.name} has no valid ratings.`);
        }
    } else {
        alert("Student not found!");
    }
}

// Function to get the average rating of the entire group
function getGroupAverage() {
    var totalGrades = 0;
    var gradeCount = 0;

    for (var i = 0; i < students.length; i++) {
        for (var j = 0; j < students[i].ratings.length; j++) {
            var rating = parseInt(students[i].ratings[j].split(":")[1].trim());
            if (!isNaN(rating)) {
                totalGrades += rating;
                gradeCount++;
            }
        }
    }

    if (gradeCount > 0) {
        var average = totalGrades / gradeCount;
        alert(`Group average rating: ${average.toFixed(2)}`);
    } else {
        alert("The group has no valid ratings.");
    }
}

// Function to sort students by grade
function sortStudentsByGrade(ascending) {
    students.sort(function (a, b) {
        var gradeA = getAverageRating(a);
        var gradeB = getAverageRating(b);

        if (ascending) {
            return gradeA - gradeB;
        } else {
            return gradeB - gradeA;
        }
    });

    displayStudents();
}

// Helper function to get the average rating of a student
function getAverageRating(student) {
    var totalGrades = 0;
    var gradeCount = 0;

    for (var i = 0; i < student.ratings.length; i++) {
        var rating = parseInt(student.ratings[i].split(":")[1].trim());
        if (!isNaN(rating)) {
            totalGrades += rating;
            gradeCount++;
        }
    }

    if (gradeCount > 0) {
        return totalGrades / gradeCount;
    } else {
        return 0;
    }
}

// Extra Point: Placeholder for an additional sorting or search function
function extraFunction() {
    // Implement your additional sorting or search function here
}

// Function to toggle the display of the student information section
function toggleDisplaySection() {
    var displaySection = document.getElementById("displaySection");
    var displayStyle = displaySection.style.display;

    if (displayStyle === "none" || displayStyle === "") {
        displaySection.style.display = "block";
        displayStudents();
    } else {
        displaySection.style.display = "none";
    }
}

// Save and load data to/from localStorage
function saveDataToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

function loadDataFromLocalStorage() {
    var storedStudents = localStorage.getItem("students");

    if (storedStudents) {
        students = JSON.parse(storedStudents);
    }
}

// Load data on page load
window.onload = function () {
    loadDataFromLocalStorage();
    toggleDisplaySection(); // To initially hide the display section
};

// Save data on page unload
window.onunload = function () {
    saveDataToLocalStorage();
};