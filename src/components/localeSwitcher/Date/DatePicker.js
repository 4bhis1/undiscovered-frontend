import * as React from 'react';
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const parseDate = ({$d}) => {
  return moment($d).format('MM/DD/YYYY');
};

export default function DatePickerComponent({value, onChange}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={props => {
          onChange(parseDate(props));
        }}
      />
    </LocalizationProvider>
  );
}

export const arrangeDates = (start, end) => {
  // Format the date range
  const formattedDateRange = `${start.format('MMM D')}–${end.format('MMM D')}`;

  // Calculate the difference in days
  const diffDays = end.diff(start, 'days');

  // Combine the formatted date range and the difference in days
  return {formattedDateRange, diffDays, diffDaysString: diffDays + ' days'};
};
