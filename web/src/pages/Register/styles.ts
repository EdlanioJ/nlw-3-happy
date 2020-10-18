import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;

  aside {
    flex: 1;
    background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      height: 400px;
      width: 260px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h1 {
        font-size: 68px;
        font-weight: 900;
        color: ${(props) => props.theme.colors.black};
      }
    }
  }

  main {
    display: flex;
    position: relative;
    width: 520px;
    padding: auto 40px;
  }
`;

export const Location = styled.div`
  margin-top: 100px;
  font-size: 24px;
  line-height: 34px;

  display: flex;
  flex-direction: column;

  strong {
    font-weight: 800;
  }
`;

export const BackButton = styled(Link)`
  position: absolute;
  right: 40px;
  top: 40px;
  right: 40px;
  width: 80px;
  height: 80px;
  background: ${(props) => props.theme.colors.black};
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: end;

  margin-left: 24px;

  transition: background-color 0.2s;

  :hover {
    background: ${(props) => props.theme.colors.lightBlue};
  }
`;
export const Form = styled.form`
  flex: 1;
  width: 100%;
  max-height: 430px;
  margin: auto 80px;

  fieldset {
    border: 0;

    legend {
      width: 100%;
      border: 0;
      font-size: 32px;
      line-height: 34px;
      color: #5c8599;
      font-weight: 700;

      border-bottom: 1px solid #d3e2e5;
    }
  }
`;

export const InputBlock = styled.div`
  :nth-child(n + 2) {
    margin-top: 24px;
  }
  label {
    display: flex;
    color: #8fa7b3;
    margin-bottom: 8px;
    line-height: 24px;

    span {
      font-size: 14px;
      color: #8fa7b3;
      margin-left: 24px;
      line-height: 24px;
    }
  }

  input {
    width: 100%;
    height: 64px;
    padding: 0 16px;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
    outline: none;
    color: #5c8599;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 24px;

  div {
    display: flex;
    align-items: center;

    input {
      width: 18px;
      height: 18px;
      border-radius: 10px;

      margin-right: 10px;
    }
    label {
      display: flex;
      color: #8fa7b3;
      line-height: 24px;

      span {
        font-size: 18px;
        color: #8fa7b3;
        margin-left: 10px;
        line-height: 24px;
      }
    }
  }

  a {
    text-decoration: none;
    font-size: 18px;
    font-family: 'Nunito';
    color: #8fa7b3;
    display: flex;
    align-items: center;
  }
`;

export const ConfirmButton = styled.button.attrs({ type: 'submit' })`
  margin-top: 24px;

  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #3cdc8c;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  svg {
    margin-right: 16px;
  }

  :hover {
    background: #36cf82;
  }
`;
