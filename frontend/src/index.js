import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Material-UI v4 theme with futuristic styling
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#667eea' },
    secondary: { main: '#ff6b6b' },
    background: {
      default: '#000000',
      paper: 'rgba(255,255,255,0.06)'
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.8)'
    }
  },
  typography: {
    fontFamily: "'Exo 2','Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
    h1: { fontFamily: "'Orbitron', sans-serif", fontWeight: 900 },
    h2: { fontFamily: "'Orbitron', sans-serif", fontWeight: 800 },
    h3: { fontFamily: "'Orbitron', sans-serif", fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  shape: { borderRadius: 16 },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
