import $ from 'jquery';
import * as XLSX from 'xlsx';

export const handleExcelUpload = (table) => {    
    let input = $('#uploadExcelInput');
  
  if (input.length === 0) {

    input = $('<input type="file" id="uploadExcelInput" accept=".xlsx, .xls" style="display: none;">');
    $('body').append(input);
  }


  input.on('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const tableData = table.rows().data().toArray();
      const subjectMap = tableData.reduce((map, row) => {
        map[row.Subject] = row;
        return map;
      }, {});

      jsonData.forEach((row) => {
        if (subjectMap[row.Subject]) {

          const rowIndex = table.rows().indexes().toArray().find(index => table.row(index).data().Subject === row.Subject);
          if (rowIndex !== undefined) {
            table.row(rowIndex).data(row).draw();
          }
        }
      });

      input.val('');
    };

    reader.readAsArrayBuffer(file);
  });

  input.click();
};