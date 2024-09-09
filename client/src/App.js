import React, { useEffect } from 'react';
import $ from 'jquery';
import DataTable from './components/DataTable';
import FileUpload from './components/FileUpload';
import { useDataTable } from './hook/useDataTable';
import './App.css';


const App = () => {
  const initialData = [
    { Subject: 'TA310', Age: 50, Sex: 'F', OnsetAge: 26, Handedness: 'R', DomHemi: 'B', Wada: '-', fMRI: 'B', CSM: '', SurgHemi: 'R', SurgType: 'ATL+AH'},
    { Subject: 'TA311', Age: 62, Sex: 'F', OnsetAge: 25, Handedness: 'R', DomHemi: 'L', Wada: '-', fMRI: 'L', CSM: '', SurgHemi: 'L', SurgType: 'ATL+AH+Other'},
    { Subject: 'TA312', Age: 43, Sex: 'F', OnsetAge: 17, Handedness: 'R', DomHemi: 'R', Wada: 'R', fMRI: 'R', CSM: '', SurgHemi: 'L', SurgType: 'ATL+AH'},
    { Subject: 'TA313', Age: 44, Sex: 'F', OnsetAge: '', Handedness: 'R', DomHemi: 'L', Wada: '-', fMRI: 'L', CSM: '', SurgHemi: 'L', SurgType: 'Other'},
    { Subject: 'TA314', Age: '', Sex: '', OnsetAge: '', Handedness: '', DomHemi: '', Wada: '', fMRI: '', CSM: '', SurgHemi: '', SurgType: ''},
    { Subject: 'TA315'}, { Subject: 'TA316'}, { Subject: 'TA317'}, { Subject: 'TA318'}, { Subject: 'TA319'}, { Subject: 'TA320'}, { Subject: 'TA321'}, { Subject: 'TA322'}, { Subject: 'TA323'}, { Subject: 'TA324'},
    { Subject: 'TA325'}, { Subject: 'TA326'}, { Subject: 'TA327'}, { Subject: 'TA328'}, { Subject: 'TA329'}, { Subject: 'TA330'}, { Subject: 'TA331'}, { Subject: 'TA332'}, { Subject: 'TA333'}, { Subject: 'TA334'},
    { Subject: 'TA335'}, { Subject: 'TA336'}, { Subject: 'TA337'}, { Subject: 'TA338'}, { Subject: 'TA339'}, { Subject: 'TA340'}, { Subject: 'TA341'}, { Subject: 'TA342'}, { Subject: 'TA343'}, { Subject: 'TA344'},
    
  ];

  const columns = ['Subject', 'Age', 'Sex', 'OnsetAge', 'Handedness', 'DomHemi', 'Wada', 'fMRI', 'CSM', 'SurgHemi', 'SurgType', 'Edit'];
  
  const {
    tableData,
    editIndex,
    handleFileUpload,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleInputChange
  } = useDataTable(initialData);

  useEffect(() => {
    const table = $('#example').DataTable();
      
    return () => {
      table.destroy();
    };
  }, [tableData]);

  return (
    <div className="container">
      <link rel="stylesheet" href="https://cdn.datatables.net/2.1.5/css/dataTables.dataTables.css" />
      <script src="https://cdn.datatables.net/2.1.5/js/dataTables.js"></script>
      <h1>Patient DataTable</h1>

      <FileUpload handleFileUpload={handleFileUpload} />
      <DataTable
        columns={columns}
        tableData={tableData}
        editIndex={editIndex}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
        handleCancelClick={handleCancelClick}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default App;
