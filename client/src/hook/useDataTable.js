import { useState } from 'react';
import * as XLSX from 'xlsx';

export const useDataTable = (initialData) => {
    const [tableData, setTableData] = useState(initialData)
    const [editIndex, setEditIndex] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
    
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
    
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    
          const updatedData = tableData.map((row) => {
            const matchingEntry = jsonData.find((entry) => entry.Subject === row.Subject);
    
            return matchingEntry ? {...row, ...matchingEntry} : row;
          });
    
          setTableData(updatedData);
        };
    
        reader.readAsArrayBuffer(file);
      };
    
      const handleEditClick = (index) => {
        setEditIndex(index);
      };
    
      const handleSaveClick = (index) => {
        setEditIndex(null);
      };
    
      const handleCancelClick = () => {
        setEditIndex(null);
      };
    
      const handleInputChange = (e, index, field) => {
        const { value } = e.target;
        const updatedData = [...tableData];
        updatedData[index][field] = value;
        setTableData(updatedData);
      };

      return {
        tableData,
        editIndex,
        handleFileUpload,
        handleEditClick,
        handleSaveClick,
        handleCancelClick,
        handleInputChange
      };
};
