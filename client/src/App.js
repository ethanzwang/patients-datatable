import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import TableContent from './components/TableContent'
import { handleAddRow } from './components/addRow';
import { handleExcelUpload } from './components/uploadExcel';
import { handleExcelExport } from './components/exportExcel';
import { handleEditRow } from './components/editRow';
import ModalComponent from './components/ModalComponent';


const App = () => {
  const [formData, setFormData] = useState({});
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const table = $('#example').DataTable();

    handleAddRow(setFormData, setEditingRowIndex);
    handleExcelUpload(table);
    handleExcelExport(table);
    handleEditRow(table, setFormData, setEditingRowIndex);

    if(!$('#example thead tr').hasClass('search-row')) {
      $('#example thead tr').clone(true).appendTo('#example thead').addClass('search-row');
      $('#example thead tr:eq(1) th').each(function (i) {
        $(this).html('<input type="text" placeholder="Search" />');

        $('input', this).on('keyup change', function() {
          if(table.column(i).search() !== this.value) {
            table.column(i).search(this.value).draw();
          }
      });
    });
    }
    
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
      const newRow = table.row.add(updatedData).draw(false).node();
      $(newRow).find('td').css({
        'font-weight': 'bold',
        'text-align': 'center',
      });
    } else if (editingRowIndex !== null) {
      const rowNode = table.row(editingRowIndex).data(updatedData).draw(false).node();
      $(rowNode).find('td').css({
        'font-weight': 'bold',
        'text-align': 'center',
      });
    }
    
    setFormData({});
    setEditingRowIndex(null);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
    setEditingRowIndex(null);
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
          <p><button id="addRow" onClick={openModal}>Add new row</button></p>
          <p><button id="buttonEdit" onClick={openModal}>Edit Row</button></p>
          <p><button id="buttonDelete">Delete selected row</button></p>
          <p><button id="exportButton">Export Excel</button></p>
          <p><button id="uploadButton">Upload Excel</button></p>
          <input type="file" id="uploadExcel" style={({ display: 'none' })} />
          <TableContent />
          
          <ModalComponent
            show={showModal}
            handleClose={closeModal}
            handleSubmit={handleFormSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </div>
      </body>
    </html>
  );
};

export default App;
