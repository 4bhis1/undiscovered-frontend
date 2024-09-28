import React, {useState} from 'react';
import {Text} from '@radix-ui/themes';
import {IoIosClose} from 'react-icons/io';
import {BudgetArray, NumberOfPeople} from './Constants';
import Place from './FormPages/Places';
import Date from './FormPages/Time';
import ActivitiesYouWant from './FormPages/Āctivities';
import Slider from '../Slider/Slider';
import {Button} from '../Button';
import HttpAuth from '../../services/HttpAuthService';
import './form.css';
import {Modal} from '@mui/material';
import { LoadingScreen } from '../../screens/LoadingScreen';

const budgetObj = {
  Economy: '5000',
  Mid: '15000',
  Luxury: '20000',
};

const whoObj = {
  Solo: {
    adults: '1',
    kids: '0',
  },
  Family: {
    adults: '2',
    kids: '2',
  },
  Friends: {
    adults: '6',
    kids: '0',
  },
  Couple: {
    adults: '2',
    kids: '1',
  },
};

const parseData = ({data = {}}) => {
  if (!data) {
    return {};
  }

  const obj = {};

  obj.destination = data.place;
  obj.budget = budgetObj[data?.budget] || '30000';
  obj.interests = Object.keys(data?.activities || {}).map(key => key);
  obj.checkinDate = data?.when?.from;
  obj.checkoutDate = data?.when?.to;
  obj.members = whoObj[data.who] || {
    adults: '2',
    kids: '2',
  };

  return obj;
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
              formState[value] = title;
              updateFormState(formState);
            }}
          />
        );
      })}
    </div>
  );
};

const BudgetRange = ({formState, updateFormState}) => {
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
              formState[value] = title;
              updateFormState(formState);
            }}
            additionalText={additionalText}
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

const PlanTripForm = props => {
  const {handleClose} = props;
  const [sliderCount, updateSliderCount] = useState(0);
  const [formState, updateFormState] = useState({
    data: {},
    errorMessage: '',
  });
  const [loading, setLoading] = useState(false);
  const Component = ComponentIndex[sliderCount];
  const showErrorMessage = errorMessage => {
    updateFormState(doc => {
      return {...doc, errorMessage};
    });
  };

  const onFormSubmit = async () => {
    setLoading(true);
    await HttpAuth.post('/v1/itinerary/generate', parseData(formState));
    setLoading(false);
    handleClose();
  };

  const updateData = updatedData => {
    updateFormState(({data, errorMessage}) => {
      return {
        data: {
          ...data,
          ...updatedData,
        },
        errorMessage,
      };
    });
  };

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
          padding: '20px',
          height: '80vh',
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
        <Modal open={loading}>
          <LoadingScreen />
        </Modal>
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
            currentStep={sliderCount}
            updateSliderCount={updateSliderCount}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              marginTop: 10,
              height: '70%',
              overflow: 'hidden',
            }}>
            <Component
              formState={formState.data}
              updateFormState={updateData}
              showErrorMessage={showErrorMessage}
            />
          </div>

          <div
            style={{
              margin: '0 10px 0 10px',
              position: 'absolute',
              width: '100%',
              bottom: '10px',
            }}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                color: 'tomato',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              {formState.errorMessage}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',

                gap: 40,
              }}>
              {sliderCount > 0 && (
                <Button
                  disable={formState.errorMessage}
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
                  disable={formState.errorMessage}
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
                  loading={loading}
                  disable={formState.errorMessage || loading}
                  title="Lets Generate"
                  onClick={onFormSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTripForm;
