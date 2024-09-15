import React, {useEffect} from 'react';
import {ListMenu} from './MainPage/LeftNav';
import Itinary from './MainPage/Itinary';
import {Direction} from '../components/map/Map';
import {useParams} from 'react-router-dom';
import HttpAuth from '../services/HttpAuthService';
import {showError} from '../hooks/showError';

import fakeData from './MainPage/data.json';

const sideNavBarItem = [
  {label: 'Home'},
  {label: 'About'},
  {label: 'Contact'},
  {label: 'Services'},
  {label: 'Blogs'},
];
const MainPage = props => {
  const {params} = props;
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await HttpAuth.post('/v1/itinerary/generate', params);
        console.log('>>> response', response);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        showError('Failed to fetch');
      }
    };
    getData();
  }, []);

  return loading ? (
    <text>Loading...</text>
  ) : (
    <div style={{flexDirection: 'row', flex: 1, display: 'flex'}}>
      <ListMenu data={sideNavBarItem} />
      <Itinary data={fakeData} />
      <Direction
        data={data}
        style={{
          flex: 3,
          position: 'relative' /* Set position to relative */,
        }}
      />
    </div>
  );
};

export default MainPage;
