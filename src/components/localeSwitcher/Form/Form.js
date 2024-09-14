import React, {useState} from 'react';
import {FaUser, FaUserFriends} from 'react-icons/fa';
import {FaPeopleGroup} from 'react-icons/fa6';
import {MdOutlineFamilyRestroom} from 'react-icons/md';
import {Box, Flex, Text, TextField} from '@radix-ui/themes';

import './form.css';
import BasicDateRangeCalendar from './DateCalendar';
import Slider from '../../Slider/Slider';

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

const NumberOfPeople = [
  {title: 'Solo', icon: FaUser},
  {title: 'Couple', icon: FaUserFriends},
  {title: 'Friends', icon: FaPeopleGroup},
  {title: 'Family', icon: MdOutlineFamilyRestroom},
];

const NumberOfPeopleGoing = ({formState, updateFormState}) => {
  const [_, updateState] = useState();
  const value = 'who';
  return (
    <div className={'who-container'}>
      {NumberOfPeople.map(({title, icon}) => {
        const Icon = icon;
        const who = formState[value];

        let className = 'people-box';

        if (title === who) {
          className += ' active';
        }

        return (
          <div
            className={className}
            key={title}
            onClick={() => {
              updateFormState(formState => {
                formState[value] = title;
                updateState(title);
                return formState;
              });
            }}>
            <Icon />
            {title}
          </div>
        );
      })}
    </div>
  );
};
const BudgetRange = () => {};
const ActivitiesYouWant = () => {};

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
