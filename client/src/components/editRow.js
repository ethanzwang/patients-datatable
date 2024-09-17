import React, { useState } from 'react';
import $ from 'jquery';


export const handleEditRow = (table, setFormData, setEditingRowIndex) => {
  $('#buttonEdit').on('click', function() {
    const selectedRow = table.row('.selected');
    if (selectedRow.node()) {
      const rowData = selectedRow.data();
      const rowIndex = selectedRow.index();

      const formData = {};
      table.columns().every(function (index) {
        const columnName = table.column(index).header().innerText;
        formData[columnName] = rowData[index];
      });

      setFormData(formData);
      setEditingRowIndex(rowIndex);
    } else {
      alert('Please select a row to edit.');
    }
  });
};