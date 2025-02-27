document.addEventListener('DOMContentLoaded', () => {
    loadClasses();
});

function addClass() {
    const className = document.getElementById('class-name').value;
    if (className) {
        let classes = JSON.parse(localStorage.getItem('classes')) || [];
        classes.push(className);
        localStorage.setItem('classes', JSON.stringify(classes));
        document.getElementById('class-name').value = '';
        updateClassList();
    }
}

function loadClasses() {
    let classes = JSON.parse(localStorage.getItem('classes')) || [];
    updateClassList(classes);
}

function updateClassList(classes = JSON.parse(localStorage.getItem('classes')) || []) {
    const classList = document.getElementById('class-list');
    classList.innerHTML = '';
    classes.forEach((className, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="class.html?name=${className}">${className}</a>`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.onclick = () => {
            classes.splice(index, 1);
            localStorage.setItem('classes', JSON.stringify(classes));
            updateClassList();
        };
        li.appendChild(deleteButton);
        classList.appendChild(li);
    });
}