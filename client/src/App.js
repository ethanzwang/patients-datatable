import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import TableContent from './components/TableContent'
import { handleAddRow } from './components/addRow';
import { handleExcelUpload } from './components/uploadExcel';
import { handleExcelExport } from './components/exportExcel';
import { handleEditRow } from './components/editRow';


const App = () => {
  const [formData, setFormData] = useState({});
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  
  useEffect(() => {
    const table = $('#example').DataTable();

    handleAddRow(setFormData, setEditingRowIndex);
    handleExcelUpload(table);
    handleExcelExport(table);
    handleEditRow(table, setFormData, setEditingRowIndex);

    $('#example tbody').on('click', 'tr', function () {
      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    });

    $('#buttonDelete').on('click', function () {
      table.row('.selected').remove().draw(false);
    });

    $('#uploadButton').on('click', function () {
      $('#uploadExcel').click();
    });

    return () => {
      $('#example tbody').off('click', 'tr');
      $('#buttonDelete').off('click');
      $('#buttonEdit').off('click');
      $('#addRow').off('click');
      $('#uploadButton').off('click');
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const table = $('#example').DataTable();
    const updatedData = Object.values(formData);

    if (editingRowIndex === 'new') {

      table.row.add(updatedData).draw(false);
    } else if (editingRowIndex !== null) {
      table.row(editingRowIndex).data(updatedData).draw(false);
    }

    setFormData({});
    setEditingRowIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    
  return (
    <html>
      <head>
        <link href="https://nightly.datatables.net/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
        <script src="https://nightly.datatables.net/js/jquery.dataTables.js"></script>
        <title>Patient DataTable</title>
      </head>
      <body>
        <div class="container">
          <p><button id="addRow">Add new row</button></p>
          <p><button id="buttonEdit">Edit Row</button></p>
          <p><button id="buttonDelete">Delete selected row</button></p>
          <p><button id="exportButton">Export Excel</button></p>
          
          <TableContent />
          
          {editingRowIndex !== null && (
            <form onSubmit={handleFormSubmit}>
              {Object.keys(formData).map((columnName) => (
                <div key={columnName}>
                  <label>{columnName}:</label>
                  <input
                    type="text"
                    name={columnName}
                    value={formData[columnName] || ''}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </body>
    </html>
  );
};

export default App;
