import React, {useState} from 'react';

import {Box, Flex, Text, TextField} from '@radix-ui/themes';

import './form.css';
import BasicDateRangeCalendar from './DateCalendar';
import Slider from '../../Slider/Slider';
import {ActivitiesArray, BudgetArray, NumberOfPeople} from './Constants';

const map = {
  text: TextField.Root,
};

export const Search = () => {
  const SearchComponent = map['text'];
  const [text, updateText] = useState();

  return (
    <SearchComponent
      value={text}
      onChange={({target}) => {
        console.log('🚀 ~ file: Form.js:17 ~ Search ~ props:', target.value);
        updateText(target.value);
      }}
    />
  );
};

const HR = (
  <div
    style={{
      height: 2,
      width: '100%',
      backgroundColor: '#c0c0c0',
    }}
  />
);

const Place = ({formState, updateFormState}) => {
  return (
    <>
      <Text>Where would you like to go?</Text>
      <Search />
    </>
  );
};

const Date = () => {
  return <BasicDateRangeCalendar />;
};

const Card = ({Icon, title, additionalText, selectedValue, onClick}) => {
  let className = 'people-box';

  if (title === selectedValue) {
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

const ComponentIndex = [
  Place,
  Date,
  NumberOfPeopleGoing,
  BudgetRange,
  ActivitiesYouWant,
];

const MainForm = () => {
  const [sliderCount, updateSliderCount] = useState(1);

  const [formState, updateFormState] = useState({});

  const Component = ComponentIndex[sliderCount];

  return (
    <Flex
      direction={'column'}
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Slider totalSteps={ComponentIndex.length} currentStep={sliderCount} />

      <Text>Plan Your Next Trip</Text>

      <Component formState={formState} updateFormState={updateFormState} />

      <Flex>
        {sliderCount > 0 && (
          <Box
            height="64px"
            onClick={() => {
              // if (sliderCount > 0) {
              updateSliderCount(count => {
                return count - 1;
              });
              // }
            }}>
            Back
          </Box>
        )}
        {sliderCount < ComponentIndex.length - 1 && (
          <Box
            height="64px"
            onClick={() => {
              // if (sliderCount < ComponentIndex.length - 1) {
              updateSliderCount(count => {
                return count + 1;
              });
              // }
            }}>
            Continue
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default MainForm;
