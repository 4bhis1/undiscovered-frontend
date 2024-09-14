import React, {useState} from 'react';
import './Slider.css'; // Updated CSS file

const Slider = ({totalSteps, currentStep, updateSliderCount}) => {
  // State to keep track of the current step

  // Handler for clicking on a specific dot

  return (
    <div className="slider-container">
      <div className="slider-dots">
        {Array.from({length: totalSteps}, (_, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => {
                updateSliderCount(index);
              }}
              className={`dot ${currentStep === index ? 'active' : ''}`}
            />
            {index < totalSteps - 1 && (
              <div
                className={`line ${currentStep > index ? 'active' : ''}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Slider;
