import { removeTask } from "./task.js";

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

function createHeader () {
    const newHeader = document.createElement('header');
    const newLabel = document.createElement('label');

    const icons = createDiv('icons')

    const labelEdit = createDiv('label-edit edit-option');
    const labelIcon = createIcon("../icon/pincel.png");
    labelEdit.append(labelIcon);

    const trashNote = createDiv('trash-note edit-option');
    const trashIcon = createIcon("../icon/trash.png", removeTask);
    trashNote.append(trashIcon);

    icons.append(labelEdit, trashNote);    
    newHeader.append(newLabel, icons);

    return newHeader;
}

export default function createNewNote ({content, select, label, reference}) {
    const main = document.querySelector('main');
    const notesAdded = document.querySelector('#added-tasks');
    const p = document.querySelector('#added-tasks > p');
    if(p){
        notesAdded.removeChild(p);
    }

    const newNote = createDiv('new-note');
    newNote.id = reference;
    const newHeader = createHeader();

    const contentDiv = createDiv('content');
    const input = document.createElement('input');
    input.type = 'checkbox';

    const taskContent = document.createElement('p');
    taskContent.innerText = content;

    contentDiv.append(input, taskContent);
    newNote.append(newHeader, contentDiv);
    notesAdded.append(newNote);
}