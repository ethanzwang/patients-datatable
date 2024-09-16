import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
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
          <table id="example" class="display nowrap" width="100%">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Age</th>
                <th>Sex</th>
                <th>OnsetAge</th>
                <th>Handedness</th>
                <th>DomHemi</th>
                <th>Wada</th>
                <th>fMRI</th>
                <th>CSM</th>
                <th>SurgHemi</th>
                <th>SurgType</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>TA310</th>
                <th>50</th>
                <th>F</th>
                <th>26</th>
                <th>R</th>
                <th>B</th>
                <th>-</th>
                <th>B</th>
                <th> </th>
                <th>R</th>
                <th>ATL+AH</th>
              </tr>
              <tr>
                <th>TA311</th>
                <th>62</th>
                <th>F</th>
                <th>25</th>
                <th>R</th>
                <th>L</th>
                <th>-</th>
                <th>L</th>
                <th> </th>
                <th>L</th>
                <th>ATL+AH+Other</th>
              </tr>
              <tr>
                <th>TA312</th>
                <th>43</th>
                <th>F</th>
                <th>17</th>
                <th>R</th>
                <th>R</th>
                <th>R</th>
                <th>R</th>
                <th> </th>
                <th>L</th>
                <th>ATL+AH</th>
              </tr>
              <tr>
                <th>TA313</th>
                <th>44</th>
                <th>F</th>
                <th> </th>
                <th>R</th>
                <th>L</th>
                <th>-</th>
                <th>L</th>
                <th> </th>
                <th>L</th>
                <th>Other</th>
              </tr> 
            </tbody>
      </table>
    </div>
  </body>
</html>
  );
};

export default App;
