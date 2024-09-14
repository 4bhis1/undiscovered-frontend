import React from 'react';
import LeftNav from './MainPage/LeftNav';
import Itinary from './MainPage/Itinary';
import Map from './MainPage/Map';

const MainPage = () => {
  return (
    <div>
      <LeftNav />
      <Itinary />
      <Map />
    </div>
  );
};

export default MainPage;
