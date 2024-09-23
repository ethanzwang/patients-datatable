import React from 'react';
import './ModalComponent.css';

const ModalComponent = ({ show, handleClose, handleSubmit, formData, handleInputChange }) =>  {
    if(!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add/Edit Row</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData).map((columnName) => (
                        <div key={columnName}>
                            <label>{columnName}:</label>
                            <input
                                type="text"
                                name={columnName}
                                value={formData[columnName] || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default ModalComponent;