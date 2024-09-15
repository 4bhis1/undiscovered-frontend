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
      <div onClick={() => {}} className="place-text">
        {data.place}
      </div>
      <div>{data.description}</div>

      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <FaClock />
        <div>{data.estimated_time}</div>
        <div>{data.location}</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
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
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
        onClick={() => {
          updateShow(show => !show);
        }}>
        {show ? <IoIosArrowDown /> : <IoIosArrowUp />}
        <h2 className="text-xl font-bold text-gray-800" style={{margin: 0}}>
          Day {data.day_no}
        </h2>
      </div>
      <h2 className="parsed-date">{parsedData}</h2>
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
    <div style={{padding: 20}}>
      <div style={{marginBottom: 20}}>
        <h2 className="mb-2 text-xl font-bold text-gray-800">Itinerary</h2>
      </div>

      {itinerary.map((doc, index) => {
        return <Day key={index} data={doc} />;
      })}
    </div>
  );
};

export default Itinarycard;
