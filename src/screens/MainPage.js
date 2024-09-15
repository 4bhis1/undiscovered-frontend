import React, {useContext, useEffect, useState} from 'react';
import {ListMenu} from './MainPage/LeftNav';
import Itinary from './MainPage/Itinary';
import {Direction} from '../components/map/Map';
import {useNavigate, useParams} from 'react-router-dom';
import HttpAuth from '../services/HttpAuthService';
import {showError} from '../hooks/showError';

import loader from '../assets/loader.gif';

import fakedata from './MainPage/data.json';
import {AuthContext} from '../context/auth/AuthContext';
import {AiContext} from '../context/AiContext';
import Chatbot from '../modules/chatbot/chatbot';

const sideNavBarItem = [
  {label: 'Home'},
  {label: 'About'},
  {label: 'Contact'},
  {label: 'Services'},
  {label: 'Blogs'},
];

const parseData = data => {
  if (!data) {
    return {};
  }

  const obj = {};

  const budgetObj = {
    Economy: '5000',
    Mid: '15000',
    Luxury: '20000',
  };

  obj.destination = Object.keys(data?.where).join(',') + '';
  obj.budget = budgetObj[data?.budget] || '30000';
  obj.interests = Object.keys(data?.activities);
  obj.checkinDate = data?.when?.from;
  obj.checkoutDate = data?.when?.to;

  obj.members = {
    adults: '2',
    kids: '1',
  };

  return obj;
};

const MainPage = props => {
  const {params = {}} = props;
  const parsedParams = parseData(params);
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const {aidata, updateAiData, isBotClose, setIsBotClose} =
    useContext(AiContext);

  const [leftIndex, updateLeftIndex] = useState(-1);

  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await HttpAuth.post(
          '/v1/itinerary/generate',
          parsedParams,
        );
        console.log('>>> response', response);
        setData(response);
        //set data in context
        updateAiData(prevState => ({...prevState, itinerary: response})); // Update the stateI
        setLoading(false);
      } catch (err) {
        showError(err);
        navigate('/welcome');
      }
    };
    getData();
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 70,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {loading ? (
        <img src={loader} />
      ) : (
        <div style={{flexDirection: 'row', flex: 1, display: 'flex'}}>
          <ListMenu
            data={sideNavBarItem}
            setData={setData}
            leftIndex={leftIndex}
            updateLeftIndex={updateLeftIndex}
          />
          <Itinary data={data} />
          <Direction data={data} />
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default MainPage;
