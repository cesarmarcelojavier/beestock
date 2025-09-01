// src/pages/Agregar.js
import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function Agregar() {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState('');

  const guardarMedicamento = async () => {
    if (!nombre || !cantidad) {
      setError('Completa todos los campos');
      return;
    }

    try {
      await addDoc(collection(db, 'medicamentos'), {
        nombre,
        cantidad: parseInt(cantidad),
        creado: Timestamp.now(),
      });
      setGuardado(true);
      setNombre('');
      setCantidad('');
      setError('');
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('No se pudo guardar');
    }
  };

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Agregar medicamento ➕
      </Typography>

      {guardado && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Medicamento guardado correctamente
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Nombre"
        fullWidth
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Cantidad"
        type="number"
        fullWidth
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" onClick={guardarMedicamento}>
        Guardar
      </Button>
    </Box>
  );
}