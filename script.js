let students = [];
let history = [];

function addStudent() {
    const studentName = document.getElementById('student-name').value;
    if (studentName) {
        students.push(studentName);
        document.getElementById('student-name').value = '';
        updateStudentList();
    }
}

function updateStudentList() {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.textContent = student;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.onclick = () => {
            students.splice(index, 1);
            updateStudentList();
        };
        li.appendChild(deleteButton);
        studentList.appendChild(li);
    });
}

function pickRandomStudent() {
    if (students.length > 0) {
        const randomIndex = Math.floor(Math.random() * students.length);
        const pickedStudent = students[randomIndex];
        document.getElementById('picked-student').textContent = `点到的学生是：${pickedStudent}`;
        history.push(pickedStudent);
        updateHistoryList();
    }
}

function updateHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((student) => {
        const li = document.createElement('li');
        li.textContent = student;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    updateHistoryList();
}