import React, {useContext, useEffect, useState} from 'react';
import {Text} from '@radix-ui/themes';
import {IoIosClose} from 'react-icons/io';

import './form.css';
import Slider from '../../Slider/Slider';
import {BudgetArray, NumberOfPeople} from './Constants';
import {Button} from '../../Button';
import {useNavigate} from 'react-router-dom';
import {AiContext} from '../../../context/AiContext';
import Place from './FormPages/Places';
import Date from './FormPages/Time';
import ActivitiesYouWant from './FormPages/Āctivities';

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

const ShowMagic = ({formState, navigate, newChat}) => {
  console.log('> formState', formState);
  navigate('/itineraries', {state: formState});
};

const PlanTripForm = props => {
  const {handleClose, newChat} = props;
  const [sliderCount, updateSliderCount] = useState(0);
  const [formState, updateFormState] = useState({
    data: {},
    errorMessage: '',
  });
  const Component = ComponentIndex[sliderCount];
  const navigate = useNavigate();

  const {updateAiData} = useContext(AiContext);

  const showErrorMessage = errorMessage => {
    updateFormState(doc => {
      return {...doc, errorMessage};
    });
  };

  const updateData = updatedData => {
    console.log(
      '🚀 ~ file: Form2.js:384 ~ updateFormState ~ data:',
      updatedData,
    );
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
            errorMessage={formState.errorMessage}
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
                  disable={formState.errorMessage}
                  title="Lets Generate"
                  onClick={() => {
                    ShowMagic({formState, navigate});
                    updateAiData(formState);
                  }}
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
