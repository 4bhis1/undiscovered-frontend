import React, {useState} from 'react';
import {Box, Flex, Text, TextField} from '@radix-ui/themes';

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
  return (
    <>
      <Text>When are you planning to go?</Text>
      <Search />
    </>
  );
};

const NumberOfPeopleGoing = () => {};
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
  const [sliderCount, updateSliderCount] = useState(0);

  const [formState, updateFormState] = useState({});

  const Component = ComponentIndex[sliderCount];

  return (
    <Flex direction={'column'}>
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
