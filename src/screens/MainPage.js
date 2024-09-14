import React from 'react';
import LeftNav from './MainPage/LeftNav';
import Itinary from './MainPage/Itinary';
import Map from './MainPage/Map';

const sideNavBarItem = [
  {label: 'Home'},
  {label: 'About'},
  {label: 'Contact'},
  {label: 'Services'},
  {label: 'Blogs'},
];
const MainPage = () => {
  return (
    <div>
      {/* <LeftNav data={sideNavBarItem} /> */}
      <Itinary />
      <Map />
    </div>
  );
};

export default MainPage;
