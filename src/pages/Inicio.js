// src/pages/Inicio.js
import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const fechaHoy = new Date().toLocaleDateString('es-AR');

export default function Inicio() {
  const [medicamentos, setMedicamentos] = useState([
    {
      id: 1,
      nombre: 'Paracetamol',
      dosis: '500mg',
      frecuencia: 'Cada 8 horas',
      cantidad: 20,
      ultimaToma: '',
    },
    {
      id: 2,
      nombre: 'Ibuprofeno',
      dosis: '400mg',
      frecuencia: 'Cada 12 horas',
      cantidad: 15,
      ultimaToma: '',
    },
  ]);

  const manejarToma = (id) => {
    setMedicamentos((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          if (med.ultimaToma === fechaHoy) return med; // Ya se tomó hoy

          return {
            ...med,
            cantidad: med.cantidad > 0 ? med.cantidad - 1 : 0,
            ultimaToma: fechaHoy,
          };
        }
        return med;
      })
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Lista de medicamentos
      </Typography>

      <Grid container spacing={2}>
        {medicamentos.map((med) => (
          <Grid item xs={12} sm={6} md={4} key={med.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{med.nombre}</Typography>
                <Typography>Dosis: {med.dosis}</Typography>
                <Typography>Frecuencia: {med.frecuencia}</Typography>
                <Typography>Stock: {med.cantidad} pastillas</Typography>
                <Typography>Fecha: {fechaHoy}</Typography>
              </CardContent>
              <CardActions>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={med.ultimaToma === fechaHoy}
                      onChange={() => manejarToma(med.id)}
                    />
                  }
                  label="Tomado hoy"
                />
                <Button size="small" color="primary">Editar</Button>
                <Button size="small" color="error">Eliminar</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}