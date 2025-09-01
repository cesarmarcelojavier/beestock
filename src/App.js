// src/App.js
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Agregar from './pages/Agregar';
import Resumen from './pages/Resumen';
import { CssBaseline, Container } from '@mui/material';

function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (guardado) {
      setUsuarioActivo(guardado);
    }
  }, []);

  // Redirigir automáticamente al inicio si hay usuario activo
  useEffect(() => {
    if (usuarioActivo) {
      navigate('/inicio');
    }
  }, [usuarioActivo, navigate]); // ✅ Incluye navigate para evitar warning

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          {usuarioActivo ? (
            <>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/agregar" element={<Agregar />} />
              <Route path="/resumen" element={<Resumen />} />
              <Route path="*" element={<Inicio />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </Container>
    </>
  );
}

export default App;