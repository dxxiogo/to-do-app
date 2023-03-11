import { completeTask, modifySelectFromTask, removeTask} from "./task.js";
import { showResourcesToEditTask } from "./edit.js";

function createDiv(className){
    const div = document.createElement('div')
    div.className = className ?? '';
    return div;
}

function createIcon (src, event){
    const newImg = document.createElement('img');
    newImg.src = src;
    newImg.addEventListener('click', event);
    return newImg;
}

function createHeader (color, label) {
    const newHeader = document.createElement('header');
    newHeader.style.backgroundColor = color;
    const newLabel = document.createElement('label');
    newLabel.textContent = label;

    const icons = createDiv('icons')

    const labelEdit = createDiv('label-edit edit-option');
    const labelIcon = createIcon("../icon/pincel.png");
    labelIcon.addEventListener('click', showResourcesToEditTask);
    labelEdit.append(labelIcon);

    const trashNote = createDiv('trash-note edit-option');
    const trashIcon = createIcon("../icon/trash.png", removeTask);
    trashNote.append(trashIcon);

    icons.append(labelEdit, trashNote);    
    newHeader.append(newLabel, icons);

    return newHeader;
}

function createInputCheck (select, label, reference, content) {
    const input = document.createElement('input');
    input.type = 'checkbox';
    if(select){
        input.checked = 'true'
    }
    completeTask(input, reference, label, content);
    return input;
}

export default function createNewNote ({content, select, label, reference, color}) {
    const notesAdded = document.querySelector('#added-tasks');
    const p = document.querySelector('#added-tasks > p');
    if(p){
        notesAdded.removeChild(p);
    }

    const newNote = createDiv('new-note');
    newNote.id = reference;
    const newHeader = createHeader(color, label);

    const contentDiv = createDiv('content');
    
    const taskContent = document.createElement('p');
    if(select){
        taskContent.classList.add('completed-task')
    }
    taskContent.innerText = content;
    const newInput = createInputCheck(select, label, reference, taskContent);

    contentDiv.append(newInput, taskContent);
    newNote.append(newHeader, contentDiv);
    notesAdded.append(newNote);
}