function showEditingOptions () {
    const options = document.querySelectorAll('.edit-option');
    options.forEach((element) => {
        element.style.display = 'block'
    })
}

function hideEditingOptions () {
    const options = document.querySelectorAll('.edit-option');
    options.forEach((element) => {
        element.style.display = 'none';
    })
}

export{showEditingOptions, hideEditingOptions};