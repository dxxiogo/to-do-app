import { removeTaskFromLabel } from "./storage.js";

function showResourcesToEditTask (eve) {
    const bgModalEdit = document.querySelector('#bg-modal-edit');
    bgModalEdit.style.display = 'flex';
    const currentTask = eve.currentTarget.parentNode.parentNode.parentNode.parentNode
    const taskContentEdit = document.querySelector('#task-content > input');
    taskContentEdit.className = `${currentTask.id}`
    taskContentEdit.value = document.querySelector(`#${currentTask.id} > .content > p`).textContent;
    return currentTask;
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
    const labelSelect = document.querySelector('#options').value ?? '';
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



function modifyTaskList (changes, currentTask, list) {
    const addedTasks = JSON.parse(localStorage.getItem(list));
    const taskModify = addedTasks.find(task => task.reference === currentTask);
    taskModify.content = changes.content;
    taskModify.label = changes.label;
    taskModify.color = colorsOption[changes.color];
    localStorage.setItem(list, JSON.stringify(addedTasks));
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
    const storageTask = JSON.parse(localStorage.getItem(task));
    const currentLabel = storageTask.label;
    if(currentLabel !== taskChanges.label && taskChanges !== '' && currentLabel !== '' ){
        removeTaskFromLabel(storageTask.reference, currentLabel);
    }
    storageTask.content = taskChanges.content;
    storageTask.color = colorsOption[taskChanges.color];
    storageTask.label = taskChanges.label;
    
    localStorage.setItem(task, JSON.stringify(storageTask));
    
    addTaskToCorrespondingLabel(taskChanges.label, storageTask);
    modifyTaskList(taskChanges, task, taskChanges.label);

    const header = document.querySelector(`#${task} > header`);
    header.style.backgroundColor = colorsOption[taskChanges.color];

    const taskLabel = document.querySelector(`#${task} > header > label`);
    taskLabel.textContent = taskChanges.label;

    const taskContent = document.querySelector(`#${task} > .content > p`);
    taskContent.textContent = taskChanges.content;
    const taskContentEdit = document.querySelector('#task-content > input');
    taskContentEdit.classList.remove(task);
    discardEditChanges();
}

export{selectColor, discardEditChanges, showResourcesToEditTask, saveEditChanges}