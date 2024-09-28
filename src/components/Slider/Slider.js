import React from 'react';
import './Slider.css'; // Updated CSS file

const tagArray = [
  'Where ?',
  'When ?',
  'Who ?',
  'Budget ?',
  "What's exciting ?",
];

const Stepper = ({currentStep, updateSliderCount}) => {
  return (
    <div className="stepper-container">
      {tagArray.map((step, index) => (
        <div
          key={index}
          className={`step ${index <= currentStep ? 'active' : ''}`}
          onClick={() => updateSliderCount(index)}>
          {step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
