import React, {useEffect, useState} from 'react';

import {Box, Flex, Text, TextField} from '@radix-ui/themes';
import {IoIosClose} from 'react-icons/io';

import './form.css';
import BasicDateRangeCalendar from './DateCalendar';
import Slider from '../../Slider/Slider';
import {
  ActivitiesArray,
  BudgetArray,
  ContinentArray,
  NumberOfPeople,
} from './Constants';
import {Button} from '../../Button';
import moment from 'moment';
import DatePickerComponent, {arrangeDates} from '../Date/DatePicker';

import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const PlaceCard = ({title, imagePath, selectedValues, onClick}) => {
  let className = 'place-image';

  if (selectedValues && Object.keys(selectedValues).includes(title)) {
    className += ' active';
  }

  return (
    <div key={title} className="image-card" onClick={onClick}>
      <div className={className}>
        <img src={imagePath} height={100} width={100} />
      </div>
      <div>{title}</div>
    </div>
  );
};

export const Search = ({value, onChange, ...props}) => {
  return <TextField.Root value={value} onChange={onChange} {...props} />;
};

const City = ({text = 'park', countryCode}) => {
  console.log('>>> called it baby');

  // const access_token =
  //   'pk.eyJ1Ijoicml0ZXNocDExMiIsImEiOiJjbTEyMDZ5ZGgweDJjMm1xMXBsanEzdGVjIn0.JEwfT3BZW7FBuQeD1gw5gA';
  let access_token =
    'pk.eyJ1Ijoic3ppbGFyZG1hdGUiLCJhIjoiY2xycXRqNjA4MDd1MDJrcWx0amRoYXp6ZyJ9.JoEWVmK7_7O4hhWySeP_Ag';
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
      console.log('🚀 ~ file: Form.js:57 ~ City ~ response:', response);

      const {features} = response.data;
      // setSuggestions(features);
    })
    .catch(error => {
      console.error('Error fetching autocomplete suggestions:', error);
    });

  return <div>Hello;</div>;
};

const Place = ({formState, updateFormState}) => {
  const [countryCode, updateState] = useState();
  const value = 'where';

  return (
    <div className={'who-container'} style={{flexDirection: 'column'}}>
      <div style={{padding: 20}}>Where would you like to go ?</div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        {ContinentArray.map(({title, imagePath, code}) => {
          return (
            <PlaceCard
              key={title}
              title={title}
              imagePath={imagePath}
              onClick={() => {
                updateFormState(formState => {
                  if (!formState[value]) {
                    formState[value] = {};
                  }
                  formState[value][title] = 1;
                  updateState(code);
                  return formState;
                });
              }}
              selectedValues={formState[value]}
            />
          );
        })}
      </div>
      {/* {formState[value] && <City countryCode={countryCode} />} */}
    </div>
  );
};

const Date = ({formState, updateFormState}) => {
  const value = 'when';

  const [{formattedDateRange, diffDays}, updateDateDiff] = useState({});
  const [date, updatedate] = useState();
  const calculateDifference = () => {
    if (formState[value]?.from && formState[value]?.to) {
      const {formattedDateRange, diffDays} = arrangeDates(
        formState[value]?.from,
        formState[value]?.to,
      );

      updateDateDiff({formattedDateRange, diffDays});
    }
  };

  useEffect(() => {
    calculateDifference();
  }, [date]);

  return (
    <div className="who-container">
      <div
        style={{
          display: 'flex',
          gap: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <DatePickerComponent
          value={formState[value]?.from}
          onChange={target => {
            updateFormState(formState => {
              if (!formState[value]) {
                formState[value] = {};
              }
              formState[value].from = target;
              return formState;
            });
            updatedate(target);
            console.log('>>> from', target);
          }}
        />
        -
        <DatePickerComponent
          value={formState[value]?.to}
          onChange={target => {
            updateFormState(formState => {
              if (!formState[value]) {
                formState[value] = {};
              }
              formState[value].to = target;
              return formState;
            });
            updatedate(target);

            console.log('>>> to', target);
          }}
        />
      </div>

      {formState[value]?.from && formState[value]?.to && (
        <div style={{textAlign: 'center', margin: '20px'}}>
          <h2>When</h2>
          <p>{`${formattedDateRange} · ${diffDays}`}</p>
        </div>
      )}
    </div>
  );
};

const Card = ({Icon, title, additionalText, selectedValue, onClick, multi}) => {
  let className = 'people-box';

  if (multi) {
    if (selectedValue && Object.keys(selectedValue).includes(title)) {
      className += ' active';
    }
  } else if (title === selectedValue) {
    className += ' active';
  }

  return (
    <div className={className} key={title} onClick={onClick}>
      <Icon />
      {title}
      {additionalText}
    </div>
  );
};

const NumberOfPeopleGoing = ({formState, updateFormState}) => {
  const [_, updateState] = useState();
  const value = 'who';

  return (
    <div className={'who-container'}>
      {NumberOfPeople.map(({title, icon}) => {
        const Icon = icon;
        return (
          <Card
            key={title}
            Icon={Icon}
            title={title}
            selectedValue={formState[value]}
            onClick={() => {
              updateFormState(formState => {
                formState[value] = title;
                updateState(title);
                return formState;
              });
            }}
          />
        );
      })}
    </div>
  );
};

const BudgetRange = ({formState, updateFormState}) => {
  const [_, updateState] = useState();
  const value = 'budget';

  return (
    <div className={'who-container'}>
      {BudgetArray.map(({title, icon, additionalText}) => {
        const Icon = icon;
        const who = formState[value];
        return (
          <Card
            key={title}
            Icon={Icon}
            title={title}
            selectedValue={who}
            onClick={() => {
              updateFormState(formState => {
                formState[value] = title;
                updateState(title);
                return formState;
              });
            }}
            additionalText={additionalText}
          />
        );
      })}
    </div>
  );
};
const ActivitiesYouWant = ({formState, updateFormState}) => {
  const [_, updateState] = useState();
  const value = 'activities';

  return (
    <div className={'who-container'}>
      {ActivitiesArray.map(({title, icon}) => {
        const Icon = icon;
        const who = formState[value];
        return (
          <Card
            key={title}
            Icon={Icon}
            title={title}
            selectedValue={who}
            multi
            onClick={() => {
              updateFormState(formState => {
                if (!formState[value]) {
                  formState[value] = {};
                }
                formState[value][title] = 1;
                updateState(title);
                return formState;
              });
            }}
          />
        );
      })}
    </div>
  );
};

const ComponentIndex = [
  Place,
  Date,
  NumberOfPeopleGoing,
  BudgetRange,
  ActivitiesYouWant,
];

const ShowMagic = ({formState, navigate}) => {
  navigate('/itineraries', {state: formState});
};

const MainForm = props => {
  const {handleClose} = props;
  const [sliderCount, updateSliderCount] = useState(0);
  const [formState, updateFormState] = useState({});
  const Component = ComponentIndex[sliderCount];
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <div
        style={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          padding: '50px',
          height: '70vh',
          width: '60vw',
          borderRadius: '10px',
          boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          position: 'relative',
        }}>
        <div
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: 10,
            right: 10,
            height: 20,
            width: 20,
            backgroundColor: '#c0c0c0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onClick={() => {
            handleClose();
          }}>
          <IoIosClose />
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 20,
            }}>
            Plan Your Next Trip
          </Text>
          <Slider
            totalSteps={ComponentIndex.length}
            currentStep={sliderCount}
            updateSliderCount={updateSliderCount}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              marginTop: 10,
            }}>
            <Component
              formState={formState}
              updateFormState={updateFormState}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '0 10px 0 10px',
              position: 'absolute',
              width: '100%',
              bottom: '10px',
              gap: 40,
            }}>
            {sliderCount > 0 && (
              <Button
                onClick={() => {
                  updateSliderCount(count => {
                    return count - 1;
                  });
                }}
                title="Back"
              />
            )}
            {sliderCount < ComponentIndex.length - 1 && (
              <Button
                onClick={() => {
                  updateSliderCount(count => {
                    return count + 1;
                  });
                }}
                title="Next"
              />
            )}

            {sliderCount === ComponentIndex.length - 1 && (
              <Button
                title="Lets Generate"
                onClick={() => {
                  console.log(formState);
                  ShowMagic({formState, navigate});
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
