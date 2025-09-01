// src/pages/Agregar.js
import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

export default function Agregar() {
  const [nombre, setNombre] = useState('');
  const [cantidadStock, setCantidadStock] = useState('');
  const [cantidadAdquirida, setCantidadAdquirida] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');
  const [confirmacion, setConfirmacion] = useState('');

  const manejarAgregar = () => {
    if (!nombre || !cantidadStock || !cantidadAdquirida || !fechaCompra) return;

    const nuevo = {
      nombre: nombre.trim(),
      cantidad: parseInt(cantidadStock),
      adquirida: parseInt(cantidadAdquirida),
      fechaCompra,
      fechaRegistro: new Date().toISOString(),
    };

    const existentes = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const actualizados = [...existentes, nuevo];
    localStorage.setItem('medicamentos', JSON.stringify(actualizados));

    setConfirmacion(`Medicamento "${nombre}" agregado`);
    setNombre('');
    setCantidadStock('');
    setCantidadAdquirida('');
    setFechaCompra('');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Agregar Medicamento
      </Typography>

      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <TextField
        label="Cantidad en stock"
        type="number"
        value={cantidadStock}
        onChange={(e) => setCantidadStock(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <TextField
        label="Cantidad adquirida"
        type="number"
        value={cantidadAdquirida}
        onChange={(e) => setCantidadAdquirida(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <TextField
        label="Fecha de compra"
        type="date"
        value={fechaCompra}
        onChange={(e) => setFechaCompra(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
        InputLabelProps={{ shrink: true }}
      />

      <Button variant="contained" color="primary" onClick={manejarAgregar}>
        Guardar
      </Button>

      {confirmacion && (
        <Alert severity="success" sx={{ marginTop: '1rem' }}>
          {confirmacion}
        </Alert>
      )}
    </Container>
  );
}