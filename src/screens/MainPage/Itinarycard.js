import moment from 'moment';
import React, {useState} from 'react';
import {FaClock, FaWallet} from 'react-icons/fa';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io';

const PlaceCard = ({data, day}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 10,
        borderColor: '#c0c0c0',
        borderStyle: 'solid',
        borderWidth: 2,
        margin: 10,
        padding: 20,
      }}>
      <div
        style={{
          position: 'absolute',
          color: 'white',
          backgroundColor: 'black',
          height: 20,
          width: 20,
          padding: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          left: -10,
          top: -10,
        }}>
        {day}
      </div>
      <div>{data.place}</div>
      <div>{data.description}</div>

      <div>
        <FaClock />
        <div>{data.estimated_time}</div>
        <div>{data.location}</div>
      </div>
      <div>
        <FaWallet />
        <div>{data.cost}</div>
      </div>
    </div>
  );
};

const Day = ({data}) => {
  const [show, updateShow] = useState(true);

  const parsedData = moment(data.date).format('dddd DD MMM');

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div
        style={{cursor: 'pointer'}}
        onClick={() => {
          updateShow(show => !show);
        }}>
        {show ? <IoIosArrowDown /> : <IoIosArrowUp />}
        Day {data.day_no}
      </div>
      <div>{parsedData}</div>
      {show && (
        <div style={{marginLeft: 10}}>
          {data.program.map(doc => {
            return <PlaceCard key={doc._id} data={doc} day={data.day_no} />;
          })}
        </div>
      )}
    </div>
  );
};

const Itinarycard = ({itinerary}) => {
  return (
    <div>
      <div>Itinerary</div>

      {itinerary.map((doc, index) => {
        return <Day key={index} data={doc} />;
      })}
    </div>
  );
};

export default Itinarycard;
