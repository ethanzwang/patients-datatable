import $ from 'jquery';

export const handleAddRow = (setFormData, setEditingRowIndex) => {
    const addNewRow = () => {
        const newFormData = {};

        const tableHeaders = [
            'Subject', 'Age', 'Sex', 'OnsetAge', 'Handedness', 'DomHemi', 'Wada', 'fMRI', 'CSM', 'SurgHemi',
            'SurgType', 'SurgDescription', 'SurgDate', 'ILAE', 'Engel', 'MRI', 'SurgHx', 'SurgHxHemi', 'SurgHxType', 'SurgHxDate',
            'PreNP_DOE', 'PostNP_DOE', 'FSIQ', 'English', 'ECoG_Hemi', 'ECoG', 'ImplantDate', 'AwakeCSM', 'AwakeCSM_Tasks', 'AsleepCSM',
            'AsleepCSM_Tasks', 'Prime', 'ThalamusStim', 'Meg', 'Rearranged', 'Reimplant', 'Reop', 'PostopMRI', 'fMRI', 'RNS',
            'DBS', 'DBS_PhaseII', 'DBS_PostTest', 'Combo', 'ALICE', 'Notes',
        ];

        tableHeaders.forEach(header => {
            newFormData[header] = '';
        });

        setFormData(newFormData);
        setEditingRowIndex('new');
    };

    $('#addRow').off('click').on('click', addNewRow)
};

