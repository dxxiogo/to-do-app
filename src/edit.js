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
    let colorSelected = colorsOption['dark-blue'];
    if( document.querySelector('.selected-color')){
        colorSelected = document.querySelector('.selected-color').id 
    } 
    const taskContent = document.querySelector('#task-content > input').value;
    return {
        label: labelSelect,
        color: colorSelected,
        content: taskContent,
    }
}

function modifyTaskList (changes, currentTask, reference) {
    const addedTasks = JSON.parse(localStorage.getItem(reference));
    addedTasks.forEach((task) => {
        if(task.reference === currentTask.id){
            console.log('entrei')
            task.content = changes.content;
            task.label = changes.label;
            task.color = colorsOption[changes.color];
        }
    });
    localStorage.setItem(reference, JSON.stringify(addedTasks));
}

function addTaskToCorrespondingLabel (label, task) {
    if(localStorage.getItem(label)){
        const labelList = JSON.parse(localStorage.getItem(label));
        const taskExists = labelList.find((currentTask) => {
            return currentTask.reference === task.reference
        })
        if(!taskExists) {
            labelList.push(task);
        }
        localStorage.setItem(label, JSON.stringify(labelList));
    }
}

function saveEditChanges (task) {
    const taskChanges = getChangesTask();
    modifyTaskList(taskChanges, task, 'added-tasks');
    const storageTask = JSON.parse(localStorage.getItem(task.id));
    storageTask.content = taskChanges.content;
    storageTask.color = colorsOption[taskChanges.color];
    if(taskChanges.label !== 'Labels'){
        storageTask.label = taskChanges.label;
        modifyTaskList(taskChanges, task, storageTask.label);
    }
    addTaskToCorrespondingLabel(taskChanges.label, storageTask);
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