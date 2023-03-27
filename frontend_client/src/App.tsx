import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

// Placeholder screens
const LoginScreen = () => (
  <Container sx={{mt: 4}}>
    <Typography variant="h4">Login</Typography>
    {/* Login form will go here */}
  </Container>
);
const FtpBrowserScreen = () => (
  <Container sx={{mt: 4}}>
    <Typography variant="h4">FTP Browser</Typography>
    {/* File and folder listing will go here */}
  </Container>
);

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Moka FTP Client
          </Typography>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/browse">Browse</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/browse" element={<FtpBrowserScreen />} />
        <Route path="/" element={<Typography sx={{p:2}}>Welcome! Navigate to Login or Browse.</Typography>} />
      </Routes>
    </Router>
  );
}

export default App;
