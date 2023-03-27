import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can create this for global styles
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Basic Material Design 3.0-ish theme (MUI v5)
// For full M3, you might explore mui-material-next or custom theming
const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#6750A4', // Example M3 primary color
    },
    secondary: {
      main: '#625B71',
    },
    background: {
      default: '#FFFBFE',
      paper: '#FFFBFE',
    },
  },
  // You can further customize typography, shape, etc. for M3 feel
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
