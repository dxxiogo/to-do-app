import createNewNote from "./struct.js";
import { createReferenceToStorage, storeTask } from "./storage.js";
import {discardEditChanges, saveEditChanges, selectColor} from "./edit.js"
import { listTasks} from "./task.js";
import { addNewLabel, cancelNewLabel, listLabelsCreated, loadAllTasks, showInputToNewLabel } from "./label.js";

const btnAdd = document.querySelector('#add-task');
btnAdd.addEventListener('click', () => {
    const taskInput = document.querySelector('#task-input');
    const task = {
        content: taskInput.value,
        label: '',
        select: false,
        color: '#9c27b0'
    }
    
    createNewNote(createReferenceToStorage(task));
    storeTask(task);
    taskInput.value = '';
})

window.addEventListener('load',listTasks)
window.addEventListener('load', listLabelsCreated);

const plusLabel = document.querySelector('#plus-label');
plusLabel.addEventListener('click', showInputToNewLabel);

const btnNewLabel = document.querySelector('#new-label > img');
btnNewLabel.addEventListener('click', addNewLabel);

const bntCancelNewLabel = document.querySelector('#new-label > button');
bntCancelNewLabel.addEventListener('click', cancelNewLabel);

const colors = document.querySelectorAll('.color');
colors.forEach((color) => color.addEventListener('click', selectColor));

const btnDiscardEditChanges = document.querySelector('#discard-changes-btn');

btnDiscardEditChanges.addEventListener('click', discardEditChanges);

const btnSaveChanges = document.querySelector('#save-changes-btn');
btnSaveChanges.addEventListener('click', () => {
    const currentTask = document.querySelector('#task-content > input').classList.value;
    saveEditChanges(currentTask)
});

const labelAll = document.querySelector('#all-notes');
labelAll.addEventListener('click', loadAllTasks)

