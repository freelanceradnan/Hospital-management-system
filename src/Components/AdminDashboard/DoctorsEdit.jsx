import React from 'react';
import { useParams } from 'react-router-dom';

const DoctorsEdit = () => {
    const {id}=useParams()
    return (
        <div>
            <h2>Edit page of {id}</h2>
        </div>
    );
};

export default DoctorsEdit;