import $ from 'jquery';

export const handleAddRow = (setFormData, setEditingRowIndex) => {
    const addNewRow = () => {
        const newFormData = {};

        const tableHeaders = [
            'Subject', 'Age', 'Sex', 'OnsetAge', 'Handedness', 'DomHemi', 'Wada', 'fMRI', 'CSM', 'SurgHemi',
            'SurgType', 'SurgDescription', 'SurgDate', 'ILAE', 'Engel', 'Etiology', 'MRI', 'SurgHx', 'SurgHxHemi', 'SurgHxType', 'SurgHxDate',
            'PreNP_DOE', 'PostNP_DOE', 'FSIQ', 'English', 'VNS', 'ECoG_Hemi', 'ECoG', 'ImplantDate', 'ExplantDate', 'AwakeCSM', 'AwakeCSM_Tasks', 'AsleepCSM',
            'AsleepCSM_Tasks', 'Prime', 'ThalamusStim', 'Meg', 'Rearranged', 'Reimplant', 'Reop',
        ];

        tableHeaders.forEach(header => {
            newFormData[header] = '';
        });

        setFormData(newFormData);
        setEditingRowIndex('new');
    };

    $('#addRow').off('click').on('click', addNewRow)
};

