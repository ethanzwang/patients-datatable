import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import TableContent from './components/TableContent'
import { handleAddRow } from './components/addRow';
import { handleExcelUpload } from './components/uploadExcel';

const App = () => {
  useEffect(() => {
    const table = $('#example').DataTable();

    handleAddRow(table);
    handleExcelUpload(table);

    $('#example tbody').on('click', 'tr', function () {
      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    });

    $('#button').on('click', function () {
      table.row('.selected').remove().draw(false);
    });

    $('#uploadButton').on('click', function () {
      $('#uploadExcel').click();
    });

    return () => {
      $('#example tbody').off('click', 'tr');
      $('#button').off('click');
      $('#addRow').off('click');
      $('#example').off('blur', '.editable');
    };
  }, []);
  
      
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
          <p><button id="button">Delete selected row</button></p>
          <TableContent />
    </div>
  </body>
</html>
  );
};

export default App;
