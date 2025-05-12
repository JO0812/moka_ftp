import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import LoginScreen from './features/auth/LoginScreen';
const FtpBrowserScreen = () => (
  <Container sx={{mt: 4}}>
    <Typography variant="h4">FTP Browser</Typography>
    {/* File and folder listing will go here */}
  </Container>
);

import { AuthProvider, useAuth } from './services/authContext';

// Navigation component that changes based on auth state
const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Moka FTP Client
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/browse">Browse Files</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Protected route component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Typography sx={{p:2}}>Please login to access this page. <Link to="/login">Go to login</Link></Typography>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/browse" element={<ProtectedRoute element={<FtpBrowserScreen />} />} />
          <Route path="/" element={<Typography sx={{p:2}}>Welcome to Moka FTP! Navigate to Login to get started.</Typography>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
