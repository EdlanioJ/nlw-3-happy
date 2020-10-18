import styled from 'styled-components';
import { Link } from 'react-router-dom';

import landing from '../../images/landing.svg';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.colors.primary};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1100px;

  position: relative;
  height: 100%;
  max-height: 680px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  background: url(${landing}) no-repeat 80% center;

  main {
    max-width: 350px;
  }

  main h1 {
    font-size: 76px;
    font-weight: 900;
    line-height: 78px;
  }

  main p {
    margin-top: 40px;
    font-size: 24px;
    line-height: 34px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeaderRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    font-size: 18px;
    font-family: 'Nunito';
    color: ${(props) => props.theme.colors.black};
  }
`;
export const Location = styled.div`
  font-size: 24px;
  line-height: 34px;

  display: flex;
  flex-direction: column;

  text-align: right;

  margin-left: 64px;
  strong {
    font-weight: 800;
  }
`;

export const EnterApp = styled(Link)`
  position: absolute;
  bottom: 0;
  right: 0;

  width: 80px;
  height: 80px;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s;

  :hover {
    background: ${(props) => props.theme.colors.lightBlue};
  }
`;

export const Button = styled.button`
  width: 80px;
  height: 80px;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 24px;

  transition: background-color 0.2s;

  :hover {
    background: ${(props) => props.theme.colors.lightBlue};
  }
`;
