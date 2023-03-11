import { storeLabel } from "./storage.js";
import createNewNote from "./struct.js";
import { listTasks} from "./task.js";

function addNewOptionToLabels (label) {
    const labelsOption = document.querySelector('#options');
    const newOption = document.createElement('option');
    newOption.value = label;
    newOption.textContent = label;
    labelsOption.append(newOption);
}

function createStructForLabel(content) {
    const newLabel = document.createElement('div');
    newLabel.className = 'new-label';
    const contentLabel = document.createElement('p');
    newLabel.addEventListener('click', () => {
        selectLabel(newLabel);
    })
    contentLabel.textContent = content;
    newLabel.append(contentLabel);
    content = '';
    return newLabel;
}

function showInputToNewLabel () {
    const newLabelArea = document.querySelector('#new-label');
    newLabelArea.style.display = 'flex'
    const plusLabel = document.querySelector('#plus-label');
    plusLabel.style.display = 'none'
}

function hideInputToNewLabel () {
    const btnShowInputToNewLabel = document.querySelector('#plus-label');
    const newLabelArea = document.querySelector('#new-label');
    newLabelArea.style.display = 'none';
    btnShowInputToNewLabel.style.display = 'block'
}

function storeLabelList (label){
    const taskList = [];
    localStorage.setItem(label, JSON.stringify(taskList));
    storeLabel(label);
}

function addNewLabel () {
     const label = document.querySelector('#new-label-input').value;
     const labelsAdded = document.querySelector('#labels');
     const createdNewLabel = createStructForLabel(label);  
     storeLabelList(label);
     addNewOptionToLabels(label);
     labelsAdded.append(createdNewLabel);
     document.querySelector('#new-label-input').value = '';
     hideInputToNewLabel();
};


function cancelNewLabel () {
    const newLabelArea = document.querySelector('#new-label');
    const btnShowInputToNewLabel = document.querySelector('#plus-label');
    newLabelArea.style.display = 'none'
    btnShowInputToNewLabel.style.display = 'block'
};

function listLabelsCreated () {
    if(localStorage.getItem('Labels')){
        const labelsAdded = document.querySelector('#labels');
        const labelsCreated = JSON.parse(localStorage.getItem('Labels'));
        labelsCreated.forEach((label) => {
            labelsAdded.append(createStructForLabel(label));
            addNewOptionToLabels(label);
        });
    }
}

function resetLabels () {
    const labels = document.querySelectorAll('.new-label');
    labels.forEach((label) => {
        label.classList.remove('selected-label');
    })
}

function cleanTask() {
    const addedTasks = document.querySelector('#added-tasks');
    addedTasks.innerText = ''
}

function selectLabel (label) {
    resetLabels();
    label.classList.add('selected-label')
    if(localStorage.getItem('added-tasks')){
        const taskList = JSON.parse(localStorage.getItem('added-tasks'));
        const thereIs = taskList.some(task => task.label === label.textContent);
        if(thereIs){
            cleanTask();
            taskList.forEach((task) => {
                if(task.label === label.textContent){
                    createNewNote(task);
                }
            })
        } else {
            const addedTasks = document.querySelector('#added-tasks');
            addedTasks.textContent = 'No tasks yet'
        }
        
    } else {
        const addedTasks = document.querySelector('#added-tasks');
        addedTasks.textContent = 'No tasks yet'
    }

}

function loadAllTasks (eve) {
    resetLabels();
    const label = eve.currentTarget;
    label.classList.add('selected-label');
    cleanTask()
    listTasks();
}

function loadTasksCorrespondingToLabel (label) {
    
}

export{showInputToNewLabel, addNewLabel, cancelNewLabel, listLabelsCreated, loadAllTasks}