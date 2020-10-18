import React, { useState, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { useTheme } from 'styled-components';
import { useAuth } from '../../context/auth';

import logo from '../../images/logotipo.svg';

import {
  BackButton,
  Container,
  Form,
  InputBlock,
  InputGroup,
  Location,
  ConfirmButton,
} from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { signIn } = useAuth();
  const history = useHistory();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      signIn({ email, password });

      history.push('/dashboard/orphanages');
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
            <legend>Fazer login</legend>

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
            <InputGroup>
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(event) => setRemember(!remember)}
                />
                <label htmlFor="remember">
                  <span>Lembrar-me</span>
                </label>
              </div>

              <Link to="">Esqueci minha senha</Link>
            </InputGroup>
          </fieldset>
          <ConfirmButton>Confirmar</ConfirmButton>
        </Form>
      </main>
    </Container>
  );
};

export default Login;
