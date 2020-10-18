import React from 'react';
import { FiInfo, FiMapPin, FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../context/auth';

import mapMarkerImg from '../../../../images/map-marker.svg';

import { Sidebar } from './styles';

const SideBar: React.FC = () => {
  const { signOut } = useAuth();
  const history = useHistory();

  function handleSignOut() {
    signOut();
    history.push('app');
  }
  return (
    <Sidebar>
      <img src={mapMarkerImg} alt="Happy" />

      <div>
        <button type="button" onClick={history.goBack}>
          <FiMapPin size={24} color="#FFF" />
        </button>
        <button type="button" onClick={history.goBack}>
          <FiInfo size={24} color="#FFF" />
        </button>
      </div>
      <footer>
        <button type="button" onClick={handleSignOut}>
          <FiPower size={24} color="#FFF" />
        </button>
      </footer>
    </Sidebar>
  );
};

export default SideBar;
