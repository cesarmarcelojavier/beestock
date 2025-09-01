// src/pages/Splash.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/inicio');
    }, 2000); // Espera 2 segundos antes de redirigir

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffbe6',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        <Typography variant="h2" gutterBottom>
          BeeStock 🐝
        </Typography>
        <Typography variant="subtitle1">
          Organizá tu medicación con inteligencia
        </Typography>
      </Box>
    </Container>
  );
}