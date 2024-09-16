import $ from 'jquery';

const createEditableCell = (value = '') => {
    return `<input type="text" class="editable" value="${value}" />`;
};

export const handleAddRow = (table) => {
    const addNewRow = () => {
        const newRow = [
            createEditableCell(),
            createEditableCell(), 
            createEditableCell(), 
            createEditableCell(), 
            createEditableCell(), 
            createEditableCell(), 
            createEditableCell(), 
            createEditableCell(), 
            createEditableCell(), 
            createEditableCell(), 
            createEditableCell(), 
        ];

        table.row
            .add(newRow)
            .draw(false);
        attachEditListeners();
    };

    $('#addRow').off('click').on('click', addNewRow);
};

const attachEditListeners = () => {
    $('#example').off('blur', '.editable').on('blur', '.editable', function () {
        const cell = $(this).closest('td');
        const value = $(this).val();
        cell.html(value);
    });
}