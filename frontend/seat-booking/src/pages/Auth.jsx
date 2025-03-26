import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleToggle = () => {
    setError('');
    setFormData({ name: '', email: '', password: '' });
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'signup') {
        await axios.post(`${BASE_URL}/api/auth/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        setMode('login');
        setError('Signup successful! Please login.');
      } else {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error occurred.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>{mode === 'login' ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {mode === 'signup' && (
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={styles.button}>
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <button onClick={handleToggle} style={styles.toggleBtn}>
        {mode === 'login' ? 'New user? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  input: {
    marginBottom: '10px',
    padding: '8px'
  },
  button: {
    padding: '10px',
    cursor: 'pointer',
    marginBottom: '10px'
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};
