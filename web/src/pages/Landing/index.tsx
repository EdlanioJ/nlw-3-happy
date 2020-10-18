import React from 'react';
import { FiArrowRight, FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useTheme as useThemeHooks } from '../../context/theme';

import logoImg from '../../images/logo.svg';

import {
  Container,
  Content,
  EnterApp,
  HeaderLeft,
  HeaderRight,
  Location,
  Button,
} from './styles';

const Landing: React.FC = () => {
  const theme = useTheme();
  const { toggleTheme } = useThemeHooks();
  return (
    <Container>
      <Content>
        <HeaderLeft>
          <img src={logoImg} alt="Happy" />

          <Location>
            <strong>Luanda</strong>
            <span>Cacuaco</span>
          </Location>
        </HeaderLeft>
        <HeaderRight>
          <Link to="/login">Acesso restrito</Link>
          <Button onClick={toggleTheme}>
            {theme.name === 'light' ? (
              <FiSun size={26} color={theme.colors.icon} />
            ) : (
              <FiMoon size={26} color={theme.colors.icon} />
            )}
          </Button>
        </HeaderRight>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <EnterApp to="app">
          <FiArrowRight size={26} color={theme.colors.icon} />
        </EnterApp>
      </Content>
    </Container>
  );
};

export default Landing;
