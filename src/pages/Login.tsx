import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import '../styles/pages/login.css'; 
import iconPng from '../images/FoodFinder.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const history = useHistory();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Chamar a API de login para obter o token
      const response = await api.post('/login', { email, password });
      const { token } = response.data;

      // Configurar o token de autenticação
      setAuthToken(token);

      // Redirecionar para a página do Finder após o login bem-sucedido
      history.push('/app');
    } catch (error) {
      setError('Email ou senha inválidos');
    }
  };

  const handleRegisterRedirect = () => {
    history.push('/register');
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-body">
        <div className="icon-container">
              <img src={iconPng} alt="Icon" className="icon" />
            </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="botao">
              <button type="submit" className="btn1 btn-primary me-md-2">Login</button>
              <button className="btn2 btn-secondary" onClick={handleRegisterRedirect}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
