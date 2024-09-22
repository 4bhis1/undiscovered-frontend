import React, {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Map from '../Map';
import './places.css';

let access_token = process.env.REACT_APP_RVITE_MAP_BOX_ACCESS_TOKEN;

const City = ({countryCode, updateFormState, formState}) => {
  console.log('>>formState', formState);
  const [place, updatePlace] = useState([]);
  const [text, updateText] = useState();

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
        const {features} = response.data;
        updatePlace(
          features.map(doc => {
            return `${doc.properties.full_address}`;
          }),
        );
      })
      .catch(error => {
        console.error('Error fetching autocomplete suggestions:', error);
      });
  }, [text]);

  return (
    <Autocomplete
      onClose={e => {
        formState['place'] = e.target.textContent;
        updateFormState(formState);
      }}
      disablePortal
      options={place}
      sx={{width: 500}}
      autoSelect={true}
      clearOnEscape={true}
      defaultValue={formState['place']}
      renderInput={params => (
        <TextField
          onChange={({target}) => {
            formState['place'] = target.value;
            updateFormState(formState);
            updateText(target.value);
          }}
          value={formState['place']}
          label="Place name"
          {...params}
        />
      )}
    />
  );
};

const Place = ({formState, updateFormState}) => {
  console.log('formState', formState);
  return (
    <div
      style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
      <div style={{display: 'flex', padding: 10, justifyContent: 'center'}}>
        Where would you like to go ?
      </div>

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
      {formState['country'] && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 180,
            position: 'absolute',
            opacity: 0.8,
            flex: 1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
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
