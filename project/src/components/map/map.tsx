import React, {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';
import {TCity, TLocation, TParking} from '../../types/types';
import useMap from '../../hooks/useMap';


type MapProps = {
  points: TParking[];
  selectedPoint?: string;
  main?: boolean;
  currentParkingLocation?: TLocation;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const CURRENT_CITY = {
  latitude: 52.9651,
  longitude: 36.0785,
  zoom: 11,
};

function Map({points, selectedPoint, main, currentParkingLocation}:MapProps): JSX.Element {

  const currentCity: TCity = currentParkingLocation ? currentParkingLocation : CURRENT_CITY;

  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

  const className = main ? 'cities' : 'property';

  useEffect(() => {
    if (map) {
      const markerGroup = leaflet.layerGroup().addTo(map);
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (point.id === selectedPoint)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(markerGroup);
      });

      if(currentParkingLocation){
        leaflet
          .marker({
            lat: currentParkingLocation.latitude,
            lng: currentParkingLocation.longitude,
          }, {
            icon: currentCustomIcon,
          })
          .addTo(markerGroup);
      }

      map.setView({lat:currentCity.latitude, lng:currentCity.longitude} );
      return () => {
        markerGroup.clearLayers();
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <section
      className = {`${className}__map map`}
      ref={mapRef}
    />
  );
}


export default Map;
