let formFields = [];
let submissions = [];

function showScreen(screenId) {
    document.getElementById('form-definition').style.display = 'none';
    document.getElementById('generated-form-container').style.display = 'none';
    document.getElementById('form-selection').style.display = 'none';
    document.getElementById('submissions-container').style.display = 'none';
    document.getElementById(screenId).style.display = 'block';
}

function showMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.className = `message ${type}`;
    messageBox.textContent = message;
    document.body.appendChild(messageBox);
    setTimeout(() => messageBox.remove(), 3000);
}

function addRow() {
    const tbody = document.getElementById('field-tbody');
    const row = tbody.insertRow();
    row.innerHTML = `
        <td><input type="text" name="field-name" placeholder="Field Name"></td>
        <td>
            <select name="field-type" onchange="toggleOptionsField(this)">
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Dropdown">Dropdown</option>
                <option value="Boolean">True/False</option>
                <option value="Date">Date</option>
            </select>
        </td>
        <td>
            <select name="mandatory">
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
        </td>
        <td><input type="text" name="options" placeholder="Comma separated options" style="display: none;"></td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
}

function toggleOptionsField(selectElement) {
    const optionsField = selectElement.closest('tr').querySelector('input[name="options"]');
    optionsField.style.display = selectElement.value === 'Dropdown' ? 'block' : 'none';
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function validateFields() {
    const rows = document.getElementById('field-tbody').rows;
    if (rows.length === 0) {
        showMessage('Please add at least one field to continue.', 'error');
        return false;
    }
    for (let row of rows) {
        const name = row.cells[0].querySelector('input').value.trim();
        const type = row.cells[1].querySelector('select').value;
        const options = row.cells[3].querySelector('input').value.trim();
        
        if (!name) {
            showMessage('Fields Cannot be Empty!', 'error');
            return false;
        }
        
        if (type === 'Dropdown' && !options) {
            showMessage('Dropdown fields must have options', 'error');
            return false;
        }
    }
    return true;
}
function saveJSON() {
    if (!validateFields()) return;

    formFields = Array.from(document.getElementById('field-tbody').rows).map(row => ({
        name: row.cells[0].querySelector('input').value.trim(),
        type: row.cells[1].querySelector('select').value,
        mandatory: row.cells[2].querySelector('select').value === 'true',
        options: row.cells[1].querySelector('select').value === 'Dropdown' ? row.cells[3].querySelector('input').value : ''
    }));

    const json = JSON.stringify(formFields, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-definition.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showMessage('Form definition saved as JSON successfully', 'success');
}

document.getElementById('load-json').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            formFields = JSON.parse(e.target.result);
            populateFormDefinition();
            showMessage('Form definition loaded successfully', 'success');
        } catch (error) {
            showMessage('Invalid JSON format', 'error');
        }
    };
    reader.readAsText(file);
});

function populateFormDefinition() {
    const tbody = document.getElementById('field-tbody');
    tbody.innerHTML = '';
    formFields.forEach(field => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><input type="text" name="field-name" value="${field.name}" placeholder="Field Name"></td>
            <td>
                <select name="field-type" onchange="toggleOptionsField(this)">
                    <option value="String" ${field.type === 'String' ? 'selected' : ''}>String</option>
                    <option value="Number" ${field.type === 'Number' ? 'selected' : ''}>Number</option>
                    <option value="Dropdown" ${field.type === 'Dropdown' ? 'selected' : ''}>Dropdown</option>
                    <option value="Boolean" ${field.type === 'Boolean' ? 'selected' : ''}>True/False</option>
                    <option value="Date" ${field.type === 'Date' ? 'selected' : ''}>Date</option>
                </select>
            </td>
            <td>
                <select name="mandatory">
                    <option value="true" ${field.mandatory ? 'selected' : ''}>True</option>
                    <option value="false" ${!field.mandatory ? 'selected' : ''}>False</option>
                </select>
            </td>
            <td><input type="text" name="options" value="${field.options}" placeholder="Comma separated options" style="display: ${field.type === 'Dropdown' ? 'block' : 'none'};"></td>
            <td><button onclick="deleteRow(this)">Delete</button></td>
        `;
        toggleOptionsField(row.cells[1].querySelector('select'));
    });
}

function generateForm() {
    if (!validateFields()) return;

    formFields = Array.from(document.getElementById('field-tbody').rows).map(row => ({
        name: row.cells[0].querySelector('input').value.trim(),
        type: row.cells[1].querySelector('select').value,
        mandatory: row.cells[2].querySelector('select').value === 'true',
        options: row.cells[1].querySelector('select').value === 'Dropdown' ? row.cells[3].querySelector('input').value : ''
    }));

    const form = document.getElementById('generated-form');
    form.innerHTML = '';
    formFields.forEach(field => {
        const fieldContainer = document.createElement('div');
        fieldContainer.className = 'form-field';
        const label = document.createElement('label');
        label.textContent = field.name + (field.mandatory ? ' *' : '');
        fieldContainer.appendChild(label);

        let input;
        switch (field.type) {
            case 'String':
                input = document.createElement('input');
                input.type = 'text';
                break;
            case 'Number':
                input = document.createElement('input');
                input.type = 'number';
                break;
            case 'Dropdown':
                input = document.createElement('select');
                field.options.split(',').forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option.trim();
                    opt.textContent = option.trim();
                    input.appendChild(opt);
                });
                break;
            case 'Boolean':
                input = document.createElement('select');
                ['True', 'False'].forEach(value => {
                    const opt = document.createElement('option');
                    opt.value = value.toLowerCase();
                    opt.textContent = value;
                    input.appendChild(opt);
                });
                break;
            case 'Date':
                input = document.createElement('input');
                input.type = 'date';
                break;
        }
        input.name = field.name;
        input.required = field.mandatory;
        fieldContainer.appendChild(input);
        form.appendChild(fieldContainer);
    });

    showScreen('generated-form-container');
}

function saveSubmission() {
    const form = document.getElementById('generated-form');
    const formData = new FormData(form);
    const submission = Object.fromEntries(formData.entries());
    
    submissions.push(submission);
    if (submissions.length > 10) submissions.shift();
    
    localStorage.setItem('submissions', JSON.stringify(submissions));
    updateSubmissionsList();
    
    showMessage('Submission saved successfully', 'success');
    form.reset();
}

function updateSubmissionsList() {
    const submissionsList = document.getElementById('submissions-list');
    submissionsList.innerHTML = '';
    submissions.slice().reverse().forEach(submission => {
        const div = document.createElement('div');
        div.className = 'submission';
        div.textContent = JSON.stringify(submission, null, 2);
        submissionsList.appendChild(div);
    });
}

function updateFormDropdown() {
    const dropdown = document.getElementById('form-dropdown');
    dropdown.innerHTML = '';
    const forms = JSON.parse(localStorage.getItem('forms') || '[]');
    forms.forEach((form, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Form ${index + 1}`;
        dropdown.appendChild(option);
    });
}

function loadSelectedForm() {
    const dropdown = document.getElementById('form-dropdown');
    const selectedIndex = dropdown.value;
    const forms = JSON.parse(localStorage.getItem('forms') || '[]');
    if (forms[selectedIndex]) {
        formFields = forms[selectedIndex];
        generateForm();
    } else {
        showMessage('No form selected', 'error');
    }
}

function viewPreviousSubmissions() {
    showScreen('submissions-container');
}

document.addEventListener('DOMContentLoaded', function() {
    addRow();
    submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    updateSubmissionsList();
    updateFormDropdown();
    showScreen('form-definition');
});