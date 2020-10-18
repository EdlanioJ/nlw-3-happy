import React, { useState, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useTheme } from 'styled-components';

import logo from '../../images/logotipo.svg';
import api from '../../service/api';

import {
  BackButton,
  Container,
  Form,
  InputBlock,
  Location,
  ConfirmButton,
} from './styles';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await api.post('register', {
        name,
        email,
        password,
        confirm_password,
      });

      history.push('login');
    } catch (error) {
      console.log(error);
    }
  }

  const theme = useTheme();

  return (
    <Container>
      <aside>
        <div>
          <img src={logo} alt="Happy" />
          <Location>
            <strong>Luanda</strong>
            <span>Cacuaco</span>
          </Location>
        </div>
      </aside>
      <main>
        <BackButton to="">
          <FiArrowLeft size={26} color={theme.colors.blue} />
        </BackButton>

        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Fazer cadastro</legend>

            <InputBlock>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                type="name"
                onChange={(event) => setName(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={email}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                value={password}
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="confirm_password">Confirmar password</label>
              <input
                id="confirm_password"
                value={confirm_password}
                type="confirm_password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </InputBlock>
          </fieldset>
          <ConfirmButton>Confirmar</ConfirmButton>
        </Form>
      </main>
    </Container>
  );
};

export default Register;
