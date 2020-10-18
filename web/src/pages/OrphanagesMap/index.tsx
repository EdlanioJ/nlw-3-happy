import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { useTheme } from 'styled-components';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../../images/map-marker.svg';

import { Container, CreateOrphanage, StyledPopup } from './style';
import { Link } from 'react-router-dom';
import api from '../../service/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const OrphanagesMap: React.FC = () => {
  const theme = useTheme();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('orphanages').then((response) => {
      setOrphanages(response.data);
    });
  }, []);
  return (
    <Container>
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Map Marker" />

          <h2>Escolha um orfanato no mapa.</h2>
          <p>Muitas crianças estão esperando a sua vista :)</p>
        </header>

        <footer>
          <strong>Luanda</strong>
          <span>Cacuaco</span>
        </footer>
      </aside>
      <Map
        center={currentPosition}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/*<TileLayer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${theme.map}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {orphanages.map((orphanage) => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <StyledPopup>
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={200} color="#fff" />
                </Link>
              </StyledPopup>
            </Marker>
          );
        })}
      </Map>

      <CreateOrphanage to="/orphanages/create">
        <FiPlus size={32} color={theme.colors.black} />
      </CreateOrphanage>
    </Container>
  );
};

export default OrphanagesMap;
