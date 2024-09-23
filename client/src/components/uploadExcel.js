import $ from 'jquery';
import * as XLSX from 'xlsx';

export const handleExcelUpload = (table) => {
    let fileInput = $('#uploadExcel');

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
                                excelRow['SurgDescription'] || rowData[11],
                                excelRow['SurgDate'] || rowData[12],
                                excelRow['ILAE'] || rowData[13],
                                excelRow['Engel'] || rowData[14],
                                excelRow['MRI'] || rowData[15],
                                excelRow['SurgHx'] || rowData[16],
                                excelRow['SurgHxHemi'] || rowData[17],
                                excelRow['SurgHxType'] || rowData[18],
                                excelRow['SurgHxDate'] || rowData[19],
                                excelRow['PreNP_DOE'] || rowData[20],
                                excelRow['PostNP_DOE'] || rowData[21],
                                excelRow['FSIQ'] || rowData[22],
                                excelRow['English'] || rowData[23],
                                excelRow['ECoG_Hemi'] || rowData[24],
                                excelRow['ECoG'] || rowData[25],
                                excelRow['ImplantDate'] || rowData[26],
                                excelRow['AwakeCSM'] || rowData[27],
                                excelRow['AwakeCSM_Tasks'] || rowData[28],
                                excelRow['AsleepCSM'] || rowData[29],
                                excelRow['AsleepCSM_Tasks'] || rowData[30],
                                excelRow['Prime'] || rowData[31],
                                excelRow['ThalamusStim'] || rowData[32],
                                excelRow['Meg'] || rowData[33],
                                excelRow['Rearranged'] || rowData[34],
                                excelRow['Reimplant'] || rowData[35],
                                excelRow['Reop'] || rowData[36],
                                
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