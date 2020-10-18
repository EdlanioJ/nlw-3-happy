/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import mapMarkerImg from '../../../images/map-marker.svg';
import SideBar from '../components/SideBar';

import { Container } from './styles';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash } from 'react-icons/fi';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});
const MyOrphanages: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ latitude, longitude });
    });
  }, []);
  return (
    <Container>
      <SideBar />
      <main>
        <div className="content">
          <header>
            <h1>Orfanatos Cadastrados</h1>

            <span>2 orfanatos</span>
          </header>
          <div className="card-container">
            <div className="card">
              <Map
                center={[currentPosition.latitude, currentPosition.longitude]}
                style={{ width: '100%', height: 235 }}
                zoom={15}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[
                    currentPosition.latitude,
                    currentPosition.longitude,
                  ]}
                />
              </Map>
              <div className="card-footer">
                <a href="#">Planalto central</a>
                <div className="card-buttons">
                  <Link to="">
                    <FiEdit2 size={24} color="#15C3D6" />
                  </Link>

                  <Link to="">
                    <FiTrash size={24} color="#15C3D6" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="card">
              <Map
                center={[currentPosition.longitude, currentPosition.latitude]}
                style={{ width: '100%', height: 235 }}
                zoom={15}
                dragging={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[
                    currentPosition.longitude,
                    currentPosition.latitude,
                  ]}
                />
              </Map>
              <div className="card-footer">
                <a href="#">Planalto central</a>
                <div className="card-buttons">
                  <Link to="">
                    <FiEdit2 size={24} color="#15C3D6" />
                  </Link>

                  <Link to="">
                    <FiTrash size={24} color="#15C3D6" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="card">
              <Map
                center={[currentPosition.latitude, currentPosition.longitude]}
                style={{ width: '100%', height: 235 }}
                zoom={15}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[
                    currentPosition.latitude,
                    currentPosition.longitude,
                  ]}
                />
              </Map>
              <div className="card-footer">
                <a href="#">Planalto central</a>
                <div className="card-buttons">
                  <Link to="">
                    <FiEdit2 size={24} color="#15C3D6" />
                  </Link>

                  <Link to="">
                    <FiTrash size={24} color="#15C3D6" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="card">
              <Map
                center={[currentPosition.latitude, currentPosition.longitude]}
                style={{ width: '100%', height: 235 }}
                zoom={15}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[
                    currentPosition.latitude,
                    currentPosition.longitude,
                  ]}
                />
              </Map>
              <div className="card-footer">
                <a href="#">Planalto central</a>
                <div className="card-buttons">
                  <Link to="">
                    <FiEdit2 size={24} color="#15C3D6" />
                  </Link>

                  <Link to="">
                    <FiTrash size={24} color="#15C3D6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default MyOrphanages;
