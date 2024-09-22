import React, {useEffect, useState} from 'react';
import DatePickerComponent, { arrangeDates } from '../../Date/DatePicker';
import moment from 'moment';
const Date = ({formState, updateFormState, showErrorMessage, errorMessage}) => {
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
      {formState[value]?.from && formState[value]?.to && errorMessage && (
        <div style={{textAlign: 'center'}}>
          <div style={{}}>When</div>
          <div>{`${formattedDateRange} · ${diffDays} days`}</div>
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
            if (!formState[value]) {
              formState[value] = {};
            }
            formState[value].from = target;
            updateFormState(formState);
            updatedate(target);
          }}
        />
        <DatePickerComponent
          value={formState[value]?.to}
          onChange={target => {
            if (!formState[value]) {
              formState[value] = {};
            }
            formState[value].to = target;
            updateFormState(formState);
            updatedate(target);
          }}
        />
      </div>
    </div>
  );
};

export default Date;
