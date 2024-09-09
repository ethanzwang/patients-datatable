import React from 'react';

const DataTable = ({ columns, tableData, editIndex, handleEditClick, handleSaveClick, handleCancelClick, handleInputChange }) => {
    return (
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
    );
};

export default DataTable;