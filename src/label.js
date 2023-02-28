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

function addNewLabel () {
     const newLabelInput = document.querySelector('#new-label-input');
     const labelsAdded = document.querySelector('#labels');
     const createdNewLabel = createStructForLabel(newLabelInput.value);  
     addNewOptionToLabels(newLabelInput.value);
     labelsAdded.append(createdNewLabel);
     newLabelInput.value = ''
     hideInputToNewLabel();
};


function cancelNewLabel () {
    const newLabelArea = document.querySelector('#new-label');
    const btnShowInputToNewLabel = document.querySelector('#plus-label');
    newLabelArea.style.display = 'none'
    btnShowInputToNewLabel.style.display = 'block'
};

export{showInputToNewLabel, addNewLabel, cancelNewLabel}