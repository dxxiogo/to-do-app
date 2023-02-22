import createNewNote from "./struct.js";
// function showEditingOptions () {
//     const options = document.querySelectorAll('.edit-option');
//     options.forEach((element) => {
//         element.style.display = 'block'
//     })
// }

// function hideEditingOptions () {
//     const options = document.querySelectorAll('.edit-option');
//     options.forEach((element) => {
//         element.style.display = 'none';
//     })
// }

function listTasks(){
    if(localStorage.getItem('added-tasks')){
        const addedItemsArr = JSON.parse(localStorage.getItem('added-tasks'));
        addedItemsArr.forEach(element => {
            createNewNote(element);
        });
    }
}

function removeTask (eve) {
    const currentTask = eve.currentTarget.parentNode.parentNode.parentNode.parentNode;
    console.log(currentTask);
    localStorage.removeItem(`${currentTask.id}`);
    let addedTasks = JSON.parse(localStorage.getItem('added-tasks'));
    addedTasks = addedTasks.filter((task) => {
         return task.reference != currentTask.id;
    });
    if(addedTasks.length == 0){
        localStorage.removeItem('amount-tasks');
        const p = document.createElement('p');
        p.textContent = 'No tasks yet'
        const addedTasksSection = document.querySelector('#added-tasks');
        addedTasksSection.append(p);
    }
    localStorage.setItem('added-tasks', JSON.stringify(addedTasks));
    currentTask.childNodes.forEach(element => element.remove());
    currentTask.remove()
    
}

function addNewLabel() {
    const newLabelInput = document.querySelector('#new-label-input').value;
    const labelsArea = document.querySelector('#labels-area');
    const newLabel = document.createElement('div');
    newLabel.className = 'new-label';
    const contentLabel = document.createElement('p');
    contentLabel.textContent = newLabelInput;
    newLabel.append(contentLabel);
    labelsArea.append(newLabel);
    const newLabelDiv = document.querySelector('#new-label');
    newLabelDiv.style.display = 'none';
    eve.currentTarget.removeEventListener('click', addNewLabel);
}

function showInputNewLabel (eve) {
    const newLabel = document.querySelector('#new-label');
    newLabel.style.display = 'block'
    eve.currentTarget.addEventListener('click', addNewLabel);
}

export {listTasks, removeTask, showInputNewLabel}