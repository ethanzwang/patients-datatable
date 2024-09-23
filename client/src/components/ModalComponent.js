import React from 'react';
import './App.css';

const ModalComponent = ({ show, handleClose, handleSubmit, formData, handleInputChange }) =>  {
    if(!show) {
        return null;
    }

    return (
        <>
            <div className="modal-overlay" onClick={handleClose}></div>
            <div className="modal">
                <form onSubmit={handleSubmit} className="modal-form">
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
                    <div className="modal-buttons">
                        <button type="submit" className="submit">Submit</button>
                        <button type="button" className="cancel" onClick={handleClose}>Close</button>
                    </div>    
                </form>
            </div>
        </>
        
    );
};

export default ModalComponent;