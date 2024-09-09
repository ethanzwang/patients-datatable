import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';
import './App.css';
import * as XLSX from 'xlsx'; 

const App = () => {
  const [tableData, setTableData] = useState([
    { Subject: 'TA310', Age: 50, Sex: 'F', OnsetAge: 26, Handedness: 'R', DomHemi: 'B', Wada: '-', fMRI: 'B', CSM: '', SurgHemi: 'R', SurgType: 'ATL+AH'},
    { Subject: 'TA311', Age: 62, Sex: 'F', OnsetAge: 25, Handedness: 'R', DomHemi: 'L', Wada: '-', fMRI: 'L', CSM: '', SurgHemi: 'L', SurgType: 'ATL+AH+Other'},
    { Subject: 'TA312', Age: 43, Sex: 'F', OnsetAge: 17, Handedness: 'R', DomHemi: 'R', Wada: 'R', fMRI: 'R', CSM: '', SurgHemi: 'L', SurgType: 'ATL+AH'},
    { Subject: 'TA313', Age: 44, Sex: 'F', OnsetAge: '', Handedness: 'R', DomHemi: 'L', Wada: '-', fMRI: 'L', CSM: '', SurgHemi: 'L', SurgType: 'Other'},
    { Subject: 'TA314', Age: '', Sex: '', OnsetAge: '', Handedness: '', DomHemi: '', Wada: '', fMRI: '', CSM: '', SurgHemi: '', SurgType: ''},
    { Subject: 'TA315'}, { Subject: 'TA316'}, { Subject: 'TA317'}, { Subject: 'TA318'}, { Subject: 'TA319'}, { Subject: 'TA320'}, { Subject: 'TA321'}, { Subject: 'TA322'}, { Subject: 'TA323'}, { Subject: 'TA324'},
    { Subject: 'TA325'}, { Subject: 'TA326'}, { Subject: 'TA327'}, { Subject: 'TA328'}, { Subject: 'TA329'}, { Subject: 'TA330'}, { Subject: 'TA331'}, { Subject: 'TA332'}, { Subject: 'TA333'}, { Subject: 'TA334'},
    { Subject: 'TA335'}, { Subject: 'TA336'}, { Subject: 'TA337'}, { Subject: 'TA338'}, { Subject: 'TA339'}, { Subject: 'TA340'}, { Subject: 'TA341'}, { Subject: 'TA342'}, { Subject: 'TA343'}, { Subject: 'TA344'},
    
  ]);
  const [columns, setColumns] = useState(['Subject', 'Age', 'Sex', 'OnsetAge', 'Handedness', 'DomHemi', 'Wada', 'fMRI', 'CSM', 'SurgHemi', 'SurgType', 'Edit']);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const table = new DataTable('#example');
      
    return () => {
      table.destroy();
    };
  }, [tableData]);
  
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

  return (
    <div className="container">
      <link rel="stylesheet" href="https://cdn.datatables.net/2.1.5/css/dataTables.dataTables.css" />
      <script src="https://cdn.datatables.net/2.1.5/js/dataTables.js"></script>
      <h1>Patient DataTable</h1>

      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <table id="example" class="display">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
              </tr>
          </thead>
          <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.slice(0, -1).map((col, colIndex) => (
                <td key={colIndex}>
                  {editIndex === rowIndex && col !== 'Subject' ? (
                    <input
                      type="text"
                      value={row[col]}
                      onChange={(e) => handleInputChange(e, rowIndex, col)}
                    />
                  ) : (
                    row[col]
                  )}
                </td>
              ))}
              <td>
                {editIndex === rowIndex ? (
                  <>
                    <button onClick={() => handleSaveClick(rowIndex)}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(rowIndex)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
    </div>
  );
};

export default App;
