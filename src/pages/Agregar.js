import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';

export default function Agregar() {
  const [nombre, setNombre] = useState('');
  const [dosis, setDosis] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !dosis || !frecuencia) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    console.log('Medicamento agregado:', { nombre, dosis, frecuencia });

    setNombre('');
    setDosis('');
    setFrecuencia('');
    setError('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Agregar medicamento
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
        />
        <TextField
          label="Dosis"
          value={dosis}
          onChange={(e) => setDosis(e.target.value)}
          fullWidth
        />
        <TextField
          label="Frecuencia"
          value={frecuencia}
          onChange={(e) => setFrecuencia(e.target.value)}
          fullWidth
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
      </Box>
    </Container>
  );
}