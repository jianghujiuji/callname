document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const className = urlParams.get('name');
    document.getElementById('class-title').textContent = className;
    loadStudents(className);
});

function addStudent() {
    const studentName = document.getElementById('student-name').value;
    const className = document.getElementById('class-title').textContent;
    if (studentName) {
        let students = JSON.parse(localStorage.getItem(className)) || [];
        students.push(studentName);
        localStorage.setItem(className, JSON.stringify(students));
        document.getElementById('student-name').value = '';
        updateStudentList(students);
    }
}

function loadStudents(className) {
    let students = JSON.parse(localStorage.getItem(className)) || [];
    updateStudentList(students);
}

function updateStudentList(students) {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.textContent = student;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.onclick = () => {
            students.splice(index, 1);
            localStorage.setItem(document.getElementById('class-title').textContent, JSON.stringify(students));
            updateStudentList(students);
        };
        li.appendChild(deleteButton);
        studentList.appendChild(li);
    });
}

function pickRandomStudent() {
    const className = document.getElementById('class-title').textContent;
    let students = JSON.parse(localStorage.getItem(className)) || [];
    if (students.length > 0) {
        const randomIndex = Math.floor(Math.random() * students.length);
        const pickedStudent = students[randomIndex];
        document.getElementById('picked-student').textContent = `点到的学生是：${pickedStudent}`;
        let history = JSON.parse(localStorage.getItem(`${className}-history`)) || [];
        history.push(pickedStudent);
        localStorage.setItem(`${className}-history`, JSON.stringify(history));
        updateHistoryList(history);
    }
}

function loadHistory(className) {
    let history = JSON.parse(localStorage.getItem(`${className}-history`)) || [];
    updateHistoryList(history);
}

function updateHistoryList(history) {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((student) => {
        const li = document.createElement('li');
        li.textContent = student;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    const className = document.getElementById('class-title').textContent;
    localStorage.removeItem(`${className}-history`);
    updateHistoryList([]);
}