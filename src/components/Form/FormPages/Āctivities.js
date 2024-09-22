import React from 'react';
import {ActivitiesArray} from '../Constants';
import './activities.css';

const Card = ({title, additionalText, selectedValue, onClick, multi}) => {
  let className = 'box';

  if (selectedValue && Object.keys(selectedValue).includes(title)) {
    className += ' active';
  }

  return (
    <div className={className} key={title} onClick={onClick}>
      {title}
    </div>
  );
};

const ActivitiesYouWant = ({formState, updateFormState}) => {
  const value = 'activities';

  return (
    <div className={'container'}>
      {ActivitiesArray.map(title => {
        const who = formState[value];
        return (
          <Card
            key={title}
            title={title}
            selectedValue={who}
            onClick={() => {
              if (!formState[value]) {
                formState[value] = {};
                formState[value][title] = 1;
              } else if (formState[value][title]) {
                delete formState[value][title];
              } else {
                formState[value][title] = 1;
              }
              updateFormState(formState);
            }}
          />
        );
      })}
    </div>
  );
};

export default ActivitiesYouWant;
