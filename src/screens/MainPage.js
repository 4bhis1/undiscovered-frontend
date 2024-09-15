import React, {useEffect} from 'react';
import {ListMenu} from './MainPage/LeftNav';
import Itinary from './MainPage/Itinary';
import {Direction} from '../components/map/Map';
import {useParams} from 'react-router-dom';
import HttpAuth from '../services/HttpAuthService';

const sideNavBarItem = [
  {label: 'Home'},
  {label: 'About'},
  {label: 'Contact'},
  {label: 'Services'},
  {label: 'Blogs'},
];
const MainPage = props => {
  const {params} = props;
  console.log('>>> params', params, props);
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const getData = async () => {
      const response = await HttpAuth.post('/v1/itinerary/generate', params);
      console.log('>>> response', response);
      setData(response.data);
      setLoading(false);
    };
    getData();
  }, []);

  return loading ? (
    <text>Loading...</text>
  ) : (
    <div style={{flexDirection: 'row', flex: 1, display: 'flex'}}>
      <ListMenu data={sideNavBarItem} />
      <Itinary data={data} />
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
