// src/pages/Login.js
import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import usuariosAutorizados from '../data/usuarios';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarLogin = () => {
    const encontrado = usuariosAutorizados.find(
      (u) => u.usuario === usuario && u.contraseña === contraseña
    );

    if (encontrado) {
      localStorage.setItem('usuarioActivo', JSON.stringify(encontrado));
      navigate('/inicio');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '4rem' }}>
      <Typography variant="h4" gutterBottom>
        Iniciar sesión
      </Typography>

      <TextField
        label="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <TextField
        label="Contraseña"
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <Button variant="contained" color="primary" onClick={manejarLogin}>
        Entrar
      </Button>

      {error && (
        <Alert severity="error" sx={{ marginTop: '1rem' }}>
          {error}
        </Alert>
      )}
    </Container>
  );
}