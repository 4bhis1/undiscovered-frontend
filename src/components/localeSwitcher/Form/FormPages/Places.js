import React, {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Map from '../Map';
import './places.css';

let access_token =
  'pk.eyJ1Ijoic3ppbGFyZG1hdGUiLCJhIjoiY2xycXRqNjA4MDd1MDJrcWx0amRoYXp6ZyJ9.JoEWVmK7_7O4hhWySeP_Ag';

const City = ({countryCode, updateFormState}) => {
  const [place, updatePlace] = useState([]);
  const [text, updateText] = useState();

  console.log('>> countryCode', countryCode);

  useEffect(() => {
    axios
      .get(`https://api.mapbox.com/search/geocode/v6/forward`, {
        params: {
          q: text,
          access_token,
          limit: 10,
          country: countryCode,
          types: ['place', 'locality'],
        },
      })
      .then(response => {
        console.log('🚀 ~ file: Form.js:71 ~ useEffect ~ response:', response);

        const {features} = response.data;
        console.log('🚀 ~ file: Form.js:68 ~ useEffect ~ features:', features);
        updatePlace(
          features.map(doc => {
            return `${doc.properties.full_address}`;
          }),
        );
      })
      .catch(error => {
        console.error('Error fetching autocomplete suggestions:', error);
      });
    updateFormState(value => {
      value['place'] = text;
      return value;
    });
  }, [text]);

  return (
    <div>
      <Autocomplete
        disablePortal
        options={place}
        sx={{width: 300}}
        renderInput={params => (
          <TextField
            onChange={({target}) => {
              updateText(target.value);
            }}
            {...params}
            label="Place name"
          />
        )}
      />
    </div>
  );
};

const Place = ({formState, updateFormState}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', padding: 10, justifyContent: 'center'}}>
        Where would you like to go ?
      </div>
      {!formState['country'] && (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Map
            onClick={(e, code) => {
              e.preventDefault();
              formState['country'] = code;
              updateFormState(formState);
            }}
            regionsSelectable={!formState?.['country']}
            selectedCountry={formState?.['country']}
          />
        </div>
      )}
      {formState['country'] && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 40,
          }}>
          <City
            countryCode={formState['country']}
            updateFormState={updateFormState}
            formState={formState}
          />
        </div>
      )}
    </div>
  );
};

export default Place;
