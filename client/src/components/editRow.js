import $ from 'jquery';

export const handleEditRow = (table) => {
    const addEditButtons = () => {
        $('#example tbody tr').each(function () {
          const $row = $(this);
    
          if ($row.find('.edit-btn').length === 0) {
            $row.append(`
              <td>
                <button class="edit-btn">Edit</button>
              </td>
            `);
          }
        });
      };
    
      table.on('draw', addEditButtons);
    
      addEditButtons();
    
      $('#example').on('click', '.edit-btn', function () {
        const $row = $(this).closest('tr');
        const rowData = table.row($row).data();
    
        $row.find('td').each(function (index) {
          if (index < rowData.length) {
            $(this).html(`<input type="text" value="${rowData[index]}">`);
          }
        });
    
        $(this).replaceWith(`
          <button class="save-btn">Save</button>
          <button class="cancel-btn">Cancel</button>
        `);
      });
    
      $('#example').on('click', '.save-btn', function () {
        const $row = $(this).closest('tr');
        const newData = [];
    
        $row.find('td input').each(function () {
          newData.push($(this).val());
        });
    
        table.row($row).data(newData).draw(false);
    
        $row.find('.save-btn, .cancel-btn').remove();
        $row.append('<td><button class="edit-btn">Edit</button></td>');
      });
    
      $('#example').on('click', '.cancel-btn', function () {
        const $row = $(this).closest('tr');
        const rowData = table.row($row).data();
    
        table.row($row).data(rowData).draw(false);
    
        $row.find('.save-btn, .cancel-btn').remove();
        $row.append('<td><button class="edit-btn">Edit</button></td>');
      });
};