// src/App.js
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Agregar from './pages/Agregar';
import Resumen from './pages/Resumen';
import Configuracion from './pages/Configuracion';
import MenuLateral from './components/MenuLateral';
import { CssBaseline, Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);

  const theme = createTheme({
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MenuLateral />
      <Container maxWidth="md" sx={{ marginTop: '2rem', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/agregar" element={<Agregar />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route
            path="/configuracion"
            element={<Configuracion setModoOscuro={setModoOscuro} />}
          />
          <Route path="*" element={<Inicio />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;