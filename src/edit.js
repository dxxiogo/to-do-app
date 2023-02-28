function showResourcesToEditTask (eve) {
    const bgModalEdit = document.querySelector('#bg-modal-edit');
    bgModalEdit.style.display = 'flex';
    const currentTask = eve.currentTarget.parentNode.parentNode.parentNode.parentNode;
    const taskContentEdit = document.querySelector('#task-content > input');
    taskContentEdit.value = document.querySelector(`#${currentTask.id} > .content > p`).textContent;
    const btnSaveChanges = document.querySelector('#save-changes-btn');
    btnSaveChanges.addEventListener('click', () => saveEditChanges(currentTask));
}


function resetColors () {
    const colors = document.querySelectorAll('.color');
    colors.forEach((color) => {
            color.classList.remove('selected-color')
    });
}

function selectColor(eve) {
    resetColors();
    eve.currentTarget.classList.add('selected-color');
}


function discardEditChanges () {
    const bgModalEdit = document.querySelector('#bg-modal-edit');
    bgModalEdit.style.display = 'none';
}


const colorsOption = {
    'pink': '#e91e63' ,
    'pourple': '#9c27b0' ,
    'green': '#30ae45',
    'dark-blue': '#3f51b5',
}

function getChangesTask () {
    const labelSelect = document.querySelector('#options').value;
    const colorSelected = document.querySelector('.selected-color').id ?? colorsOption['dark-blue'];
    const taskContent = document.querySelector('#task-content > input').value;
    return {
        label: labelSelect,
        color: colorSelected,
        content: taskContent,
    }
}

function saveEditChanges (task) {
    const taskChanges = getChangesTask();
    const storageTask = JSON.parse(localStorage.getItem(task.id));
    storageTask.label = taskChanges.label;
    storageTask.content = taskChanges.content;
    storageTask.color = colorsOption[taskChanges.color];
    localStorage.setItem(task.id, JSON.stringify(storageTask));
    const header = document.querySelector(`#${task.id} > header`);
    header.style.backgroundColor = colorsOption[taskChanges.color];
    if(taskChanges.label != 'Labels'){
        const taskLabel = document.querySelector(`#${task.id} > header > label`);
        taskLabel.textContent = taskChanges.label;
    }
    const taskContent = document.querySelector(`#${task.id} > .content > p`);
    taskContent.textContent = taskChanges.content;
    discardEditChanges();
}

export{selectColor, discardEditChanges, showResourcesToEditTask}