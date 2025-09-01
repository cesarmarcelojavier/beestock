// src/pages/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const administradores = ['marcelo@beestock.ar', 'natalia@beestock.ar'];

  const manejarLogin = async () => {
    try {
      const resultado = await signInWithEmailAndPassword(auth, email, contraseña);
      const emailAutenticado = resultado.user.email.toLowerCase();

      if (!administradores.includes(emailAutenticado)) {
        setError('Este usuario no está autorizado como administrador');
        return;
      }

      const usuario = {
        uid: resultado.user.uid,
        email: emailAutenticado,
        nombre: emailAutenticado.includes('marcelo') ? 'Marcelo' : 'Natalia',
        rol: 'administrador',
      };

      localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
      navigate('/inicio');
    } catch (err) {
      setError('Credenciales incorrectas o usuario no autorizado');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Iniciar sesión
      </Typography>

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <TextField
        label="Contraseña"
        type={mostrarContraseña ? 'text' : 'password'}
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setMostrarContraseña((prev) => !prev)}>
                {mostrarContraseña ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button variant="contained" onClick={manejarLogin}>
        Acceder
      </Button>

      {error && (
        <Alert severity="error" sx={{ marginTop: '1rem' }}>
          {error}
        </Alert>
      )}
    </Container>
  );
}