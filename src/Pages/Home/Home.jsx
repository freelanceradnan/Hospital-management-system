import React from 'react';
import Header from '../../Components/Header/Header';
import SpecialityMenu from '../../Components/SpecialityMenu/SpecialityMenu';
import TopDoctors from '../../Components/TopDoctors/TopDoctors';
import Banner from '../../Components/Banner/Banner';


const Home = () => {
    return (
        <div>
        <Header/>
        <SpecialityMenu/>
        <TopDoctors/>
        <Banner/>
        
        </div>
    );
};

export default Home;