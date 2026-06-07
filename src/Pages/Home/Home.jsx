import React from 'react';
import Header from '../../Components/Header/Header';
import SpecialityMenu from '../../Components/SpecialityMenu/SpecialityMenu';
import TopDoctors from '../../Components/TopDoctors/TopDoctors';

const Home = () => {
    return (
        <div>
        <Header/>
        <SpecialityMenu/>
        <TopDoctors/>
        </div>
    );
};

export default Home;