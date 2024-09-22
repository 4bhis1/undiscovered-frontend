import React, {useContext, useEffect, useState} from 'react';
import {Text} from '@radix-ui/themes';
import {IoIosClose} from 'react-icons/io';

import './form.css';
import Slider from '../../Slider/Slider';
import {ActivitiesArray, BudgetArray, NumberOfPeople} from './Constants';
import {Button} from '../../Button';
import DatePickerComponent, {arrangeDates} from '../Date/DatePicker';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';

import TextField from '@mui/material/TextField';
import {AiContext} from '../../../context/AiContext';
import Place from './FormPages/Places';

export const Search = ({value, onChange, ...props}) => {
  return <TextField.Root value={value} onChange={onChange} {...props} />;
};

const Date = ({formState, updateFormState, showErrorMessage}) => {
  const value = 'when';

  const [{formattedDateRange, diffDays}, updateDateDiff] = useState({});
  const [date, updatedate] = useState();
  const calculateDifference = () => {
    if (formState[value]?.from && formState[value]?.to) {
      const start = moment(formState[value]?.from);
      const end = moment(formState[value]?.to);
      const current = moment();
      if (start.isBefore(current) || end.isBefore(current)) {
        showErrorMessage('Both dates should be greater than the current date');
      }
      if (end.isBefore(start)) {
        showErrorMessage('From Date should be less then to date');
      } else if (current.isSameOrAfter(start)) {
        showErrorMessage(
          'From Date should be greater or equal to current date',
        );
      } else {
        const {formattedDateRange, diffDays} = arrangeDates(start, end);

        if (diffDays > 5) {
          showErrorMessage('To much holidays');
        } else {
          updateDateDiff({formattedDateRange, diffDays});
        }
        showErrorMessage('');
      }
    }
  };

  useEffect(() => {
    calculateDifference();
  }, [JSON.stringify(formState[value])]);

  return (
    <div className="who-container" style={{flexDirection: 'column'}}>
      {formState[value]?.from && formState[value]?.to && (
        <div style={{textAlign: 'center', margin: '10px'}}>
          <h2>When</h2>
          <p>{`${formattedDateRange} · ${diffDays} days`}</p>
        </div>
      )}
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
          }}
        />
      </div>
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
  const [state, updateState] = useState();
  const value = 'activities';

  useEffect(() => {
    updateState(formState[value]);
  }, [state]);

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
                  formState[value][title] = 1;
                } else if (formState[value][title]) {
                  delete formState[value][title];
                } else {
                  formState[value][title] = 1;
                }
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

const ShowMagic = ({formState, navigate, newChat}) => {
  // if (newChat) {
  //   navigate('/itineraries-1', {state: formState});
  // } else {
  navigate('/itineraries', {state: formState});
  // }
};

const PlanTripForm = props => {
  const {handleClose, newChat} = props;
  const [sliderCount, updateSliderCount] = useState(0);
  const [formState, updateFormState] = useState({
    data: {},
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
