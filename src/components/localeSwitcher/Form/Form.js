import React, {useEffect, useState} from 'react';

import {Box, Flex, Text, TextField} from '@radix-ui/themes';

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

const map = {
  text: TextField.Root,
};

export const Search = ({value, onChange, ...props}) => {
  const SearchComponent = map['text'];

  return <SearchComponent value={value} onChange={onChange} {...props} />;
};

const Place = ({formState, updateFormState}) => {
  const [_, updateState] = useState();
  const value = 'where';

  return (
    <div className={'who-container'}>
      {ContinentArray.map(({title, imagePath}) => {
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
                updateState(title);
                return formState;
              });
            }}
            selectedValues={formState[value]}
          />
        );
      })}
    </div>
  );
};

const Date = ({formState, updateFormState}) => {
  console.log('🚀 ~ file: Form.js:88 ~ Date ~ formState:', formState);
  const value = 'when';

  const [dateDiff, updateDateDiff] = useState();

  const calculateDifference = () => {
    if (formState[value]?.from && formState[value]?.to) {
      const from = moment(formState[value]?.from);
      const to = moment(formState[value]?.to);
      updateDateDiff(to.diff(from, 'days'));
    }
  };

  useEffect(() => {
    calculateDifference();
  }, [formState[value]]);

  return (
    <div className="who-container">
      <div
        style={{
          display: 'flex',
          gap: 50,
        }}>
        <Search
          type={'date'}
          style={{height: 80, width: 250}}
          value={formState[value]?.from}
          onChange={({target}) => {
            updateFormState(formState => {
              if (!formState[value]) {
                formState[value] = {};
              }
              formState[value].from = target.value;
              return formState;
            });
            console.log('>>> from', target.value);
          }}
        />
        <Search
          type={'date'}
          style={{height: 80, width: 250}}
          value={formState[value]?.to}
          onChange={({target}) => {
            updateFormState(formState => {
              if (!formState[value]) {
                formState[value] = {};
              }
              formState[value].to = target.value;
              return formState;
            });
            console.log('>>> to', target.value);
          }}
        />
      </div>
      <div>{dateDiff}</div>
    </div>
  );

  // return <BasicDateRangeCalendar />;
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

const ShowMagic = ({formState}) => {
  console.log('>>> formState', formState);
};

const MainForm = () => {
  const [sliderCount, updateSliderCount] = useState(0);
  const [formState, updateFormState] = useState({});
  const Component = ComponentIndex[sliderCount];
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
          height: '80vh',
          width: '80vw',
          borderRadius: '10px',
          boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}>
        <div
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
          <Slider
            totalSteps={ComponentIndex.length}
            currentStep={sliderCount}
            updateSliderCount={updateSliderCount}
          />
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            Plan Your Next Trip
          </Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
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
                  ShowMagic({formState});
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
