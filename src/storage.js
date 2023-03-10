function storeTask (task) {
    if(localStorage.getItem(task.reference)){
        const taskAdedd = JSON.parse(localStorage.getItem(`${task.reference}`)) 
    } else {
        localStorage.setItem(task.reference, JSON.stringify(task));
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

function createReferenceToStorage (task) {
    if(localStorage.getItem('amount-tasks')){
        let amountTasks = Number(JSON.parse(localStorage.getItem('amount-tasks')));
        amountTasks ++;
        task.reference = `task-${amountTasks}`;
        localStorage.setItem('amount-tasks', JSON.stringify(amountTasks));
    } else {
        let amountTasks = 1;
        task.reference = `task-${amountTasks}`;
        localStorage.setItem('amount-tasks', JSON.stringify(amountTasks));
    }
}

function storeLabel (label) {
    if(localStorage.getItem('Labels')){
        const labels = JSON.parse(localStorage.getItem('Labels'));
        labels.push(label);
        localStorage.setItem('Labels', JSON.stringify(labels));
    } else {
        const labelsList = [];
        labelsList.push(label);
        localStorage.setItem('Labels', JSON.stringify(labelsList));
    }
}

function removeTaskFromLabel(reference, label){
    if(label !== ''){
        let labelList = JSON.parse(localStorage.getItem(label));
        labelList = labelList.filter((task) => {
            return task.reference !== reference;
        })
        localStorage.setItem(`${label}`, JSON.stringify(labelList));
    }
}

export{createReferenceToStorage, storeTask, storeLabel, removeTaskFromLabel};
