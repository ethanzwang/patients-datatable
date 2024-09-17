import * as XLSX from 'xlsx';
import $ from 'jquery';

export const handleExcelExport = (table) => {
    $('#exportButton').on('click', function () {
        const data = [];

        const headers = [];
        $('#example thead th').each(function () {
            headers.push($(this).text());
        });
        data.push(headers);

        table.rows().every(function () {
            const rowData = this.data();
            data.push(rowData);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(data);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'DataTable Export');

        XLSX.writeFile(workbook, 'datatable_export.xlsx');
    });
};