import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

function getColorForRoute(index) {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD']; // Define your colors here
  return colors[index % colors.length]; // Cycle through colors
}

export const Direction = props => {
  const {data, defualtDay = 0, defaultProgram = 0, show} = props;
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/mapbox/streets-v11',
  );
  const [day, setDay] = useState(defualtDay);
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_RVITE_MAP_BOX_ACCESS_TOKEN;

    const allCoordinates = [];

    data?.itinerary?.[day]?.program?.forEach(program => {
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
      center: allCoordinates?.[defaultProgram]?.cordinates || [0, 0],
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
              <div class="popup-tag">
                <text>${index + 1}</text>
              </div>
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

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.fitBounds(bounds, {
        padding: 50,
      });

      const allCoordinatesAtoB = [];
      allCoordinates?.forEach((coord, index) => {
        if (index < allCoordinates.length - 1) {
          allCoordinatesAtoB.push([
            coord.cordinates.map(Number),
            allCoordinates[index + 1].cordinates.map(Number),
          ]);
        }
      });
      for (let i = 0; i < allCoordinatesAtoB?.length; i++) {
        const routeCoordinates = allCoordinatesAtoB?.[i]
          .map(coord => coord.join(','))
          .join(';');
        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${routeCoordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

        fetch(directionsUrl)
          .then(response => response.json())
          .then(data => {
            const route = data?.routes?.[0]?.geometry?.coordinates;
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
  }, [mapStyle, day, data?._id, show]);

  const handleMapStyleChange = event => {
    setMapStyle(event.target.value);
  };

  return (
    <div
      ref={mapContainerRef}
      style={{
        flex: 3,
      }}>
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
        {data?.itinerary?.map((_, index) => (
          <option key={index} value={index}>
            Day {index + 1}
          </option>
        ))}
      </select>
      {data?.itinerary?.[day]?.program?.map((coord, index) => (
        <div
          key={index}
          id={
            'custom-marker' +
            'day' +
            data?.itinerary?.[day]?.date +
            'index' +
            coord._id
          }
          className="mapboxgl-marker mapboxgl-marker-anchor-center"
          style={{
            backgroundColor: getColorForRoute(index),
          }}
          tabIndex={'0'}
        />
      ))}
    </div>
  );
};
