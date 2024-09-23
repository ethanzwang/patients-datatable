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
                                excelRow['Etiology'] || rowData[15],
                                excelRow['MRI'] || rowData[16],
                                excelRow['SurgHx'] || rowData[17],
                                excelRow['SurgHxHemi'] || rowData[18],
                                excelRow['SurgHxType'] || rowData[19],
                                excelRow['SurgHxDate'] || rowData[20],
                                excelRow['PreNP_DOE'] || rowData[21],
                                excelRow['PostNP_DOE'] || rowData[22],
                                excelRow['FSIQ'] || rowData[23],
                                excelRow['English'] || rowData[24],
                                excelRow['VNS'] || rowData[25],
                                excelRow['ECoG_Hemi'] || rowData[26],
                                excelRow['ECoG'] || rowData[27],
                                excelRow['ImplantDate'] || rowData[28],
                                excelRow['ExplantDate'] || rowData[29],
                                excelRow['AwakeCSM'] || rowData[30],
                                excelRow['AwakeCSM_Tasks'] || rowData[31],
                                excelRow['AsleepCSM'] || rowData[32],
                                excelRow['AsleepCSM_Tasks'] || rowData[33],
                                excelRow['Prime'] || rowData[34],
                                excelRow['ThalamusStim'] || rowData[35],
                                excelRow['Meg'] || rowData[36],
                                
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