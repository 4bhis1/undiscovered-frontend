import React, {useEffect, useState} from 'react';

import data from './data.json';
import axios from 'axios';
import {Box, Skeleton, Typography} from '@mui/material';
import {
  FaCalendar,
  FaCity,
  FaGlobe,
  FaLanguage,
  FaMoneyBill,
  FaTemperatureHigh,
} from 'react-icons/fa';
import moment from 'moment';
import Itinarycard from './Itinarycard';

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

const StatItem = ({icon: Icon, content}) => (
  <Box display="flex" alignItems="center" style={{marginBottom: '8px'}}>
    <Box
      style={{
        height: '48px', // h-6
        width: '48px', // w-6
        borderRadius: '50%', // rounded-full
        backgroundColor: '#E0E0E0', // bg-gray-200
        padding: '8px', // p-2
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon style={{fontSize: '24px', color: '#4A4A4A'}} />{' '}
      {/* Adjust color and size as necessary */}
    </Box>
    <Typography
      variant="body1"
      style={{marginLeft: '16px', fontWeight: '500', color: '#4A4A4A'}}>
      {content}
    </Typography>
  </Box>
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

const DescriptionCard = ({destination}) => {
  const MenuArray = ['Overview', 'General Information'];

  const [menuIndex, updateMenuIndex] = useState(0);

  const Overview = () => {
    return (
      <div style={{paddingLeft: 8, paddingRight: 8}}>
        <h2 className="mb-2 text-xl font-bold text-gray-800">Description</h2>
        <p className="text-md mb-4 text-justify font-medium text-gray-600">
          {destination?.short_desc}
        </p>
        <h2 className="mb-2 text-xl font-bold text-gray-800">History</h2>
        <p className="text-md text-justify font-medium text-gray-600">
          {destination?.short_history}
        </p>
      </div>
    );
  };

  const GI = () => {
    return (
      <div className="grid w-full grid-cols-2 grid-rows-3 gap-6">
        <StatItem icon={FaMoneyBill} content={destination.currency} />
        <StatItem
          icon={FaMoneyBill}
          content={destination.one_dollar_in_local_currency}
        />
        <StatItem icon={FaCity} content={destination.capital_of_country} />
        <StatItem
          icon={FaTemperatureHigh}
          content={destination.local_weather}
        />
        <StatItem icon={FaGlobe} content={destination.time_format} />
        <StatItem
          icon={FaLanguage}
          content={destination.languages_spoken.map(language => language + ' ')}
        />
      </div>
    );
  };

  return (
    <div style={{padding: 20}}>
      <div style={{display: 'flex', gap: 10}}>
        {MenuArray.map((doc, index) => {
          return (
            <div
              style={{
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
      <div>
        {menuIndex === 0 ? (
          <Overview destination={destination} />
        ) : (
          <GI destination={destination} />
        )}
      </div>
    </div>
  );
};

const Itinary = () => {
  const {destination, itinerary} = data;
  return (
    <div>
      <TopContainer destination={destination} />
      <DescriptionCard destination={destination} />
      <HR />
      <Itinarycard itinerary={itinerary} />
    </div>
  );
};

export default Itinary;
