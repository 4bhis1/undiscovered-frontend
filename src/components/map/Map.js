import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, {useEffect, useRef, useState} from 'react';
import {AiFillHome} from 'react-icons/ai';
import {GiWideArrowDunk} from 'react-icons/gi';
import {MdLocationOn} from 'react-icons/md';
import './Map.scss';

function getColorForRoute(index) {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD']; // Define your colors here
  return colors[index % colors.length]; // Cycle through colors
}

const tempData = {
  destination: {
    numberOfDays: 3,
    destinationCities: ['Istanbul', 'Cappadocia'],
    destinationCountry: 'Turkey',
    currency: 'Turkish Lira',
    oneDollarInLocalCurrency: 24.5,
    languagesSpoken: ['Turkish', 'English'],
    timeThereInUtcFormat: 'UTC + 3',
    capitalOfTheCountry: 'Ankara',
    localWeather: 'Continental',
    temperatureRangeThroughTheYear: '0°C to 35°C',
    shortDescription:
      'Turkey offers a rich mix of history, culture, and natural beauty. From the bustling streets of Istanbul to the unique landscapes of Cappadocia, there is something for everyone.',
    shortHistory:
      'Turkey has a rich history that spans thousands of years, acting as a bridge between Europe and Asia. It was once home to empires such as the Byzantines and Ottomans, leaving behind a legacy of stunning architecture and cultural diversity.',
    startDate: '2024-12-12',
    endDate: '2024-12-14',
  },
  itinerary: [
    {
      day: 1,
      date: '2024-12-12',
      program: [
        {
          id: 1,
          programOrPlaceName: 'Hagia Sophia',
          timeSpentThere: '1.5 hours',
          location: 'Istanbul',
          coordinateOfEvent: [28.9795, 41.0082],
          shortDescriptionOfProgram:
            'A stunning architectural marvel that has served as a cathedral and mosque throughout its history. Visitors can marvel at its grand dome and exquisite mosaics.',
          cost: 200,
          type: 'activity',
        },
        {
          id: 2,
          programOrPlaceName: 'Grand Bazaar',
          timeSpentThere: '2 hours',
          location: 'Istanbul',
          coordinateOfEvent: [28.9714, 41.0106],
          shortDescriptionOfProgram:
            'One of the largest and oldest covered markets in the world, great for shopping souvenirs and experiencing local culture.',
          cost: 0,
          type: 'activity',
        },
        {
          id: 3,
          programOrPlaceName: 'Dinner at a Local Restaurant',
          timeSpentThere: '2 hours',
          location: 'Istanbul',
          coordinateOfEvent: [28.9795, 41.0082],
          shortDescriptionOfProgram:
            'Enjoy a traditional Turkish dinner featuring kebabs, mezes, and baklava.',
          cost: 1500,
          type: 'dining',
        },
        {
          id: 4,
          programOrPlaceName: 'Nightlife in Taksim Square',
          timeSpentThere: '3 hours',
          location: 'Istanbul',
          coordinateOfEvent: [28.9791, 41.0348],
          shortDescriptionOfProgram:
            'Explore vibrant nightlife with cafes and bars, and enjoy live music.',
          cost: 500,
          type: 'activity',
        },
      ],
    },
    {
      day: 2,
      date: '2024-12-13',
      program: [
        {
          id: 5,
          programOrPlaceName: 'Travel to Cappadocia',
          timeSpentThere: '2 hours',
          location: 'Cappadocia',
          coordinateOfEvent: [34.8504, 38.645],
          shortDescriptionOfProgram:
            'Take a scenic drive or flight to Cappadocia, known for its fairy chimneys and unique landscapes.',
          cost: 5000,
          type: 'transportation',
        },
        {
          id: 6,
          programOrPlaceName: 'Göreme Open-Air Museum',
          timeSpentThere: '2 hours',
          location: 'Cappadocia',
          coordinateOfEvent: [34.8314, 38.6439],
          shortDescriptionOfProgram:
            "Explore an area filled with rock-cut churches and stunning frescoes, showcasing the region's Christian heritage.",
          cost: 150,
          type: 'activity',
        },
        {
          id: 7,
          programOrPlaceName: 'Dinner in Göreme',
          timeSpentThere: '2 hours',
          location: 'Cappadocia',
          coordinateOfEvent: [34.8314, 38.6439],
          shortDescriptionOfProgram:
            'Taste local dishes like pottery kebab in a traditional setting.',
          cost: 1200,
          type: 'dining',
        },
        {
          id: 8,
          programOrPlaceName: 'Cappadocia Night Tour',
          timeSpentThere: '2 hours',
          location: 'Cappadocia',
          coordinateOfEvent: [34.8504, 38.645],
          shortDescriptionOfProgram:
            'Discover the enchanting views of Cappadocia under the stars.',
          cost: 300,
          type: 'activity',
        },
      ],
    },
    {
      day: 3,
      date: '2024-12-14',
      program: [
        {
          id: 9,
          programOrPlaceName: 'Hot Air Balloon Ride',
          timeSpentThere: '3 hours',
          location: 'Cappadocia',
          coordinateOfEvent: [34.8478, 38.6572],
          shortDescriptionOfProgram:
            "Experience a breathtaking hot air balloon ride over Cappadocia's unique landscape early in the morning.",
          cost: 12000,
          type: 'activity',
        },
        {
          id: 10,
          programOrPlaceName: 'Visit Uchisar Castle',
          timeSpentThere: '1.5 hours',
          location: 'Cappadocia',
          coordinateOfEvent: [34.8077, 38.6289],
          shortDescriptionOfProgram:
            'Climb to the top of this ancient fortress for panoramic views of the region.',
          cost: 100,
          type: 'activity',
        },
        {
          id: 11,
          programOrPlaceName: 'Lunch at a Local Restaurant',
          timeSpentThere: '2 hours',
          location: 'Cappadocia',
          coordinateOfEvent: [34.8314, 38.6439],
          shortDescriptionOfProgram:
            'Enjoy traditional Cappadocian cuisine, perfect for winding down your trip.',
          cost: 1000,
          type: 'dining',
        },
        {
          id: 12,
          programOrPlaceName: 'Return to Istanbul',
          timeSpentThere: '2 hours',
          location: 'Cappadocia',
          coordinateOfEvent: [34.8504, 38.645],
          shortDescriptionOfProgram:
            'Travel back to Istanbul for your departure.',
          cost: 5000,
          type: 'transportation',
        },
      ],
    },
  ],
  estimatedCosts: [
    {
      category: 'Accommodation',
      hostelCostPerNight: 400,
      hotelCostPerNight: 2000,
      luxuryHotelCostPerNight: 6000,
      airbnbCostPerNight: 1500,
    },
    {
      category: 'Transportation',
      busCost: 200,
      taxiCost: 150,
      trainCost: 300,
      rentalCost: 800,
    },
    {
      category: 'Food',
      streetFoodCost: 50,
      budgetRestaurantCost: 300,
      fancyRestaurantCost: 1500,
      traditionalFoodCost: 800,
    },
    {
      category: 'Activities',
      mainActivityForEachDay: [
        {
          mainActivityName: 'Hagia Sophia and Grand Bazaar',
          costOfProgram: 1700,
        },
        {
          mainActivityName: 'Göreme Open-Air Museum',
          costOfProgram: 150,
        },
        {
          mainActivityName: 'Hot Air Balloon Ride',
          costOfProgram: 12000,
        },
      ],
    },
  ],
};

export const Direction = props => {
  const {data = tempData} = props;
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/mapbox/streets-v11',
  );
  const [day, setDay] = useState(0);
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_RVITE_MAP_BOX_ACCESS_TOKEN;

    const allCoordinates = [];

    data.itinerary[day].program.forEach(program => {
      allCoordinates.push({
        cordinates: program.coordinate,
        name: program.place,
        shortDescriptionOfProgram: program.description,
        timeSpentThere: program.estimated_time,
      });
    });

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: allCoordinates?.[0]?.cordinates || [],
      attributionControl: false,
    });

    map.on('style.load', () => {
      allCoordinates.forEach((coord, index) => {
        new mapboxgl.Marker({
          element: document.getElementById(
            'custom-marker' + 'day' + day + 'index' + index,
          ),
        })
          .setLngLat(coord.cordinates)
          .addTo(map)
          .setPopup(
            new mapboxgl.Popup({closeButton: true}).setHTML(
              `<div class="location-details">
            <div class="location-info">
              <h2>${coord.name}</h3>
              <p>${coord.timeSpentThere}</p>
            </div>
              <p>${coord.shortDescriptionOfProgram}</p>
            </div>`,
            ),
          );
      });

      const bounds = allCoordinates.reduce(
        (bounds, coord) => bounds.extend(coord.cordinates.map(Number)),
        new mapboxgl.LngLatBounds(),
      );

      map.addControl(new mapboxgl.NavigationControl());

      map.fitBounds(bounds, {
        padding: 50,
      });

      const allCoordinatesAtoB = [];
      allCoordinates.forEach((coord, index) => {
        if (index < allCoordinates.length - 1) {
          allCoordinatesAtoB.push([
            coord.cordinates.map(Number),
            allCoordinates[index + 1].cordinates.map(Number),
          ]);
        }
      });
      for (let i = 0; i < allCoordinatesAtoB.length; i++) {
        const routeCoordinates = allCoordinatesAtoB?.[i]
          .map(coord => coord.join(','))
          .join(';');
        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${routeCoordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

        fetch(directionsUrl)
          .then(response => response.json())
          .then(data => {
            const route = data.routes[0].geometry.coordinates;
            if (map.getSource('route' + i)) {
              map.removeLayer('route' + i);
              map.removeSource('route' + i);
            }

            // Define a color based on the current index
            const color = getColorForRoute(i);
            map.addSource('route' + i, {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: route,
                },
              },
            });

            map.addLayer({
              id: 'route' + i,
              type: 'line',
              source: 'route' + i,
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': color, // Use the determined color
                'line-width': 8,
              },
            });

            // Fit the map to the route
            const bounds = new mapboxgl.LngLatBounds();
            route.forEach(point => bounds.extend(point));
            map.fitBounds(bounds, {padding: 20});
          })
          .catch(error => console.error('Error fetching directions:', error));
      }
    });

    return () => {
      map.remove();
    };
  }, [mapStyle, day]);

  const handleMapStyleChange = event => {
    setMapStyle(event.target.value);
  };

  return (
    <div {...props}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100vh',
          // border: '1px solid',
          // marginBottom: '3rem',
        }}
      />
      <select
        className="map-style-dropdown"
        value={mapStyle}
        onChange={handleMapStyleChange}
        id="map_type"
        key={'map_style_dropdown'}>
        <option value="mapbox://styles/mapbox/streets-v11">MAP</option>
        <option value="mapbox://styles/mapbox/satellite-v9">SATELLITE</option>
      </select>
      <select
        className="map-day-dropdown"
        value={day}
        onChange={e => setDay(e.target.value)}
        id="map_day"
        key={'map_day_dropdown'}>
        {data.itinerary.map((_, index) => (
          <option key={index} value={index}>
            Day {index + 1}
          </option>
        ))}
      </select>
      {data.itinerary[day].program.map((coord, index) => (
        <div
          key={index}
          id={'custom-marker' + 'day' + day + 'index' + index}
          className="mapboxgl-marker mapboxgl-marker-anchor-center"
          style={{
            backgroundColor: getColorForRoute(index),
          }}
          tabIndex={'0'}></div>
      ))}
    </div>
  );
};
