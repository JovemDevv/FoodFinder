import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import iconPng from '../images/FoodFinder.png';
import '../styles/pages/register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.post('/register', 
        { name, email, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Verifique se o status da resposta está na faixa de sucesso (200-299)
      if (response.status >= 200 && response.status < 300) {
        history.push('/login');
      } else {
        setError('Failed to register user');
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Response error:', error.response);
        const errorMessage = error.response.data?.message || error.response.data?.error || 'An error occurred';
        setError(`Error: ${errorMessage}`);
      } else if (error.request) {
        console.error('Request error:', error.request);
        setError('No response from server');
      } else {
        console.error('Other error:', error.message);
        setError('Error setting up request');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="card">
        <div className="card-body">
          <div className="icon-container">
            <img src={iconPng} alt="Icon" className="icon" />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="botao">
              <button type="submit" className="btn btn-primary me-md-2">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
