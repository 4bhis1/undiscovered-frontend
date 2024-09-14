import React, {useEffect, useState} from 'react';

import data from './data.json';
import axios from 'axios';
import {Skeleton} from '@mui/material';
import {FaCalendar} from 'react-icons/fa';
import moment from 'moment';

const useGetImage = ({location}) => {
  const [loading, updateLoading] = useState(true);
  const [imageurl, updateImageUrl] = useState();

  useEffect(() => {
    axios
      .get(`http://172.18.0.71:4010/v1/itinerary/image?location=${location}`, {
        params: {},
      })
      .then(({data}) => {
        updateImageUrl(data.url);
        updateLoading(false);
      })
      .catch(error => {
        console.error('Error fetching autocomplete suggestions:', error);
      });
  }, []);
  return {loading, imageurl};
};

const HR = () => (
  <div
    style={{
      borderColor: '#c0c0c0',
      borderWidth: 2,
      borderStyle: 'solid',
      display: 'flex',
      flex: 1,
    }}></div>
);

const TopContainer = ({destination}) => {
  const {loading, imageurl} = useGetImage({
    location: destination.destination_country,
  });
  const fromdate = moment(destination.start_date).format('YY-MMM-DD');
  const todate = moment(destination.end_date).format('YY-MMM-DD');
  return (
    <div style={{display: 'flex', position: 'relative', flex: 1, height: 300}}>
      {loading ? (
        <Skeleton sx={{height: 300}} animation="wave" variant="rectangular" />
      ) : (
        <img src={imageurl} height={300} width={'100%'} />
      )}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 10,
          left: 10,
          flexDirection: 'column',
          gap: 4,
        }}>
        <div>{destination.number_of_days} days trip</div>
        <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
          <FaCalendar />
          <div>{fromdate}</div>
          <div>-</div>
          <div>{todate}</div>
        </div>
      </div>
    </div>
  );
};

const DescriptionCard = () => {
  const MenuArray = ['Overview', 'General Information'];

  const [menuIndex, updateMenuIndex] = useState(0);

  const OverView = () => {};

  const GI = () => {};

  return (
    <div style={{display: 'flex'}}>
      {MenuArray.map((doc, index) => {
        return (
          <div
            style={{
              margin: 10,
              padding: 10,
              borderColor: '#c0c0c0',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 20,
              cursor: 'pointer',
            }}
            onClick={() => {
              updateMenuIndex(index);
            }}
            key={index}>
            {doc}
          </div>
        );
      })}
      {/* {menuIndex} */}
    </div>
  );
};

const Itinary = () => {
  const {destination} = data;
  return (
    <div>
      <TopContainer destination={destination} />
      <DescriptionCard />
      <HR />
    </div>
  );
};

export default Itinary;
