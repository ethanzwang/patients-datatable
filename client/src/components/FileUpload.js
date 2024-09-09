import React from "react";

const FileUpload = ({ handleFileUpload }) => {
    return (
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    );
};

export default FileUpload;