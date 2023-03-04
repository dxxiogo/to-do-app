import { removeTaskFromLabel } from "./storage.js";
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
    const taskToRemove = JSON.parse(localStorage.getItem(`${currentTask.id}`));
    removeTaskFromLabel(taskToRemove.reference, taskToRemove.label);
    localStorage.removeItem(`${currentTask.id}`);
    let addedTasks = JSON.parse(localStorage.getItem('added-tasks'));
    addedTasks = addedTasks.filter((task) => {
         return task.reference !== taskToRemove.reference;
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
    currentTask.remove();
}

function modifySelectFromTask(list, reference, value){
    if(list !== ''){
        let taskList = JSON.parse(localStorage.getItem(list));
        taskList = taskList.map((element) => {
            if(element.reference == reference){
                element.select = value;
                return element;
            } else {
                return element;
        }});
        localStorage.setItem(list, JSON.stringify(taskList));
    }
}


function completeTask (input, reference, label, content) {
    input.addEventListener('change', () => {
        const task = JSON.parse(localStorage.getItem(`${reference}`));
        if(input.checked){
            content.classList.add('completed-task');
            input.checked = true;
            task.select = true;
            modifySelectFromTask(label, reference, true);
            modifySelectFromTask('added-tasks', reference, true);
        } else {
            input.checked = false
            task.select = false
            modifySelectFromTask('added-tasks', reference, false);
            content.classList.remove('completed-task');
        }
        localStorage.setItem(`${reference}`, JSON.stringify(task));
    });
}





export {listTasks, removeTask, completeTask, modifySelectFromTask}