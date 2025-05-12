import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from '../../services/authContext';

const LoginScreen: React.FC = () => {
  // State and hooks setup
  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated, setFtpSession } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/browse');
    }
  }, [isAuthenticated, navigate]);

  const [host, setHost] = useState('localhost'); // Default for testing
  const [port, setPort] = useState('21');
  const [username, setUsername] = useState('test'); // Default for testing with debug mode
  const [password, setPassword] = useState('password'); // Default for testing with debug mode
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const portNumber = parseInt(port, 10);
      if (isNaN(portNumber)) {
        setError('Port must be a valid number.');
        setLoading(false);
        return;
      }
      const response = await login(host, portNumber, username, password);
      if (response.success && response.token) {
        setSuccessMessage('Login successful!');
        // Store auth token using our auth context
        authLogin(response.token);
        // Save FTP session details for later use
        setFtpSession({
          host,
          port: portNumber,
          username
        });
        // Redirect after a short delay to show success message
        setTimeout(() => {
          navigate('/browse');
        }, 1500);
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during login.');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          FTP Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="host"
            label="FTP Host"
            name="host"
            autoComplete="host"
            autoFocus
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="port"
            label="Port"
            name="port"
            type="number"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginScreen;