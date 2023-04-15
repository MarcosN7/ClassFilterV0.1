const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

// Array to store student data
const students = [];

// Function to render student list
const renderStudentList = (filteredStudents = students) => {
    // Clear student list
    studentList.innerHTML = '';

    // Loop through students array and create a list item for each student
    filteredStudents.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.innerHTML = `
            <strong>Name:</strong> ${student.firstName} ${student.lastName} |
            <strong>Age:</strong> ${student.age} |
            <strong>Class:</strong> ${student.class}
        `;
        studentList.appendChild(studentItem);
    });
};

// Function to handle form submission
const handleFormSubmit = (event) => {
    event.preventDefault();

    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = parseInt(document.getElementById('age').value);
    const classValue = document.getElementById('class').value;

    // Create student object
    const student = {
        firstName,
        lastName,
        age,
        class: classValue
    };
    // Add student object to students array
    students.push(student);

    // Render updated student list
    renderStudentList();

    // Reset form fields
    studentForm.reset();
};

// Add submit event listener to student form
studentForm.addEventListener('submit', handleFormSubmit);

// Function to filter students by age
const filterStudentsByAge = () => {
    const filterByAgeValue = document.getElementById('filterByAge').value;

    let filteredStudents = [];

    if (filterByAgeValue === 'asc') {
        filteredStudents = students.sort((a, b) => a.age - b.age); // Sort students by age in ascending order
    } else if (filterByAgeValue === 'desc') {
        filteredStudents = students.sort((a, b) => b.age - a.age); // Sort students by age in descending order
    } else {
        filteredStudents = students; // If no filter is selected, show all students
    }

    renderStudentList(filteredStudents); // Render filtered student list
};

// Add change event listener to filter by age select element
document.getElementById('filterByAge').addEventListener('change', filterStudentsByAge);

// Function to filter students by class
const filterStudentsByClass = () => {
    const filterByClassValue = document.getElementById('filterByClass').value;

    let filteredStudents = [];

    if (filterByClassValue === 'all') {
        filteredStudents = students; // Show all students
    } else {
        filteredStudents = students.filter(student => student.class === filterByClassValue); // Filter students by class
    }

    renderStudentList(filteredStudents); // Render filtered student list
};

// Add change event listener to filter by class select element
document.getElementById('filterByClass').addEventListener('change', filterStudentsByClass);

// Function to sort students by age
const sortStudents = () => {
    const sortByAge = document.getElementById('sortByAge').checked;
    const sortByName = document.getElementById('sortByName').checked;
    let sortedStudents = [];

if (sortByAge) {
    sortedStudents = students.sort((a, b) => a.age - b.age); // Sort students by age
} else if (sortByName) {
    sortedStudents = students.sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toUpperCase(); // Convert names to uppercase for case-insensitive comparison
        const nameB = `${b.firstName} ${b.lastName}`.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }); // Sort students by name
}

renderStudentList(sortedStudents); // Render sorted student list
};

// Add change event listeners to sort by age and sort by name checkboxes
document.getElementById('sortByAge').addEventListener('change', sortStudents);
document.getElementById('sortByName').addEventListener('change', sortStudents);
