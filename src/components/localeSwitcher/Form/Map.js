import React from 'react';
import {VectorMap} from 'react-jvectormap';

const Map = ({onClick}) => {
  return (
    <VectorMap
      map={'world_mill'}
      backgroundColor="transparent" //change it to ocean blue: #0077be
      zoomOnScroll={false}
      containerStyle={{
        width: '80%',
        height: '420px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
      onRegionClick={onClick} //gets the country code
      containerClassName="map"
      regionStyle={{
        initial: {
          fill: '#e4e4e4',
          'fill-opacity': 0.9,
          stroke: 'none',
          'stroke-width': 0,
          'stroke-opacity': 0,
        },
        hover: {
          'fill-opacity': 0.8,
          cursor: 'pointer',
        },
        selected: {
          fill: '#2938bc', //color for the clicked country
        },
        selectedHover: {},
      }}
      regionsSelectable={true}
    />
  );
};
export default Map;
