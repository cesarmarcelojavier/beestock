// src/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (modoOscuro) =>
  createTheme({
    palette: {
      mode: modoOscuro ? 'dark' : 'light',
      primary: {
        main: modoOscuro ? '#90caf9' : '#2e7d32',
      },
      background: {
        default: modoOscuro ? '#121212' : '#f5f5f5',
      },
    },
  });