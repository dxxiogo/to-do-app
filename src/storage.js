export function storeTask (task) {
    console.log(task);
    if(localStorage.getItem(task.reference)){
        const taskAdedd = JSON.parse(localStorage.getItem(`${task.reference}`)) 
    } else {
        localStorage.setItem(task.reference, JSON.stringify(task));
        console.log(task.reference)
        if(localStorage.getItem('added-tasks')){
            const addedTasks = JSON.parse(localStorage.getItem('added-tasks'));
            addedTasks.push(task)
            localStorage.setItem('added-tasks', JSON.stringify(addedTasks));
        } else {
            const addedTasks = [];
            addedTasks.push(task);
            localStorage.setItem('added-tasks', JSON.stringify(addedTasks));  
        }
    }
}

