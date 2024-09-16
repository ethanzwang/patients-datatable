import $ from 'jquery';
import * as XLSX from 'xlsx';

export const handleExcelUpload = (table) => {
    let fileInput = $('#uploadExcel');

    if (fileInput.length === 0) {
        fileInput = $('<input type="file" id="uploadExcel" accept=".xlsx, .xls" />');
        $('.container').append(fileInput);
    }

    fileInput.on('change', function (e) {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

                worksheet.forEach((excelRow) => {
                    const subject = excelRow['Subject'];

                    table.rows().every(function () {
                        const rowData = this.data();
                        const rowSubject = rowData[0];

                        if (rowSubject === subject) {
                            const updatedData = [
                                excelRow['Subject'] || rowData[0],
                                excelRow['Age'] || rowData[1],
                                excelRow['Sex'] || rowData[2],
                                excelRow['OnsetAge'] || rowData[3],
                                excelRow['Handedness'] || rowData[4],
                                excelRow['DomHemi'] || rowData[5],
                                excelRow['Wada'] || rowData[6],
                                excelRow['fMRI'] || rowData[7],
                                excelRow['CSM'] || rowData[8],
                                excelRow['SurgHemi'] || rowData[9],
                                excelRow['SurgType'] || rowData[10],
                            ];
                            this.data(updatedData);
                        }
                    });
                });

                table.draw(false);
            };

            reader.readAsArrayBuffer(file);
        }
    });
};