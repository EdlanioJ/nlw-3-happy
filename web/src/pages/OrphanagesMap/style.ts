import { Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;

  aside {
    width: 448px;
    background: ${(props) => props.theme.colors.primary};
    padding: 80px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  aside h2 {
    font-size: 40px;
    font-weight: 800;
    line-height: 42px;
    margin-top: 64px;
  }

  aside p {
    line-height: 28px;
    margin-top: 24px;
  }

  aside footer {
    display: flex;
    flex-direction: column;

    line-height: 24px;
  }

  aside footer strong {
    font-weight: 800;
  }

  .leaflet-container {
    z-index: 5;
  }
`;

export const CreateOrphanage = styled(Link)`
  position: absolute;
  right: 40px;
  bottom: 40px;

  z-index: 10;

  width: 64px;
  height: 64px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  :hover {
    background: ${(props) => props.theme.colors.blue};
  }
`;

export const StyledPopup = styled(Popup).attrs({
  closeButton: false,
  minWidth: 240,
  maxWidth: 240,
})`
  .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: none;
  }

  .leaflet-popup-content {
    color: #0089a4;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      width: 40px;
      height: 40px;
      background: #15c3dc;

      display: flex;
      justify-content: center;
      align-items: center;

      box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
      border-radius: 12px;
    }
  }

  .leaflet-popup-tip-container {
    display: none;
  }
`;
