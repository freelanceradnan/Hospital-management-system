import React from 'react';
import { auth } from '../../Firebase/Firebase';

const MyProfileManagement = () => {
    const currentuser=auth?.currentUser
    return (
        <div>
            <h2>Welcome! {currentuser?.email}</h2>
        </div>
    );
};

export default MyProfileManagement;