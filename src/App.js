// src/App.js
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Agregar from './pages/Agregar';
import Resumen from './pages/Resumen';
import Configuracion from './pages/Configuracion';
import MenuLateral from './components/MenuLateral';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <MenuLateral />
      <Container maxWidth="md" sx={{ marginTop: '2rem', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/agregar" element={<Agregar />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="*" element={<Inicio />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;