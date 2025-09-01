// src/pages/Recordatorios.js
import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

export default function Recordatorios() {
  const [medicamento, setMedicamento] = useState('');
  const [hora, setHora] = useState('');
  const [frecuencia, setFrecuencia] = useState('Diario');
  const [recordatorios, setRecordatorios] = useState([]);
  const [confirmacion, setConfirmacion] = useState('');

  const frecuencias = ['Diario', 'Cada 8 horas', 'Cada 12 horas', 'Cada 24 horas'];

  const manejarAgregar = () => {
    if (!medicamento || !hora) return;

    const nuevo = { medicamento, hora, frecuencia };
    setRecordatorios((prev) => [...prev, nuevo]);
    setConfirmacion(`Recordatorio creado para ${medicamento} a las ${hora}`);
    setMedicamento('');
    setHora('');
    setFrecuencia('Diario');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Recordatorios
      </Typography>

      <TextField
        label="Medicamento"
        value={medicamento}
        onChange={(e) => setMedicamento(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <TextField
        label="Hora"
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }}
      />

      <TextField
        select
        label="Frecuencia"
        value={frecuencia}
        onChange={(e) => setFrecuencia(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      >
        {frecuencias.map((f) => (
          <MenuItem key={f} value={f}>
            {f}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" color="primary" onClick={manejarAgregar}>
        Agregar recordatorio
      </Button>

      {confirmacion && (
        <Alert severity="success" sx={{ marginTop: '1rem' }}>
          {confirmacion}
        </Alert>
      )}

      {recordatorios.length > 0 && (
        <Paper sx={{ marginTop: '2rem' }}>
          <Typography variant="h6" sx={{ padding: '1rem' }}>
            Recordatorios activos
          </Typography>
          <List>
            {recordatorios.map((r, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${r.medicamento} - ${r.hora}`}
                  secondary={`Frecuencia: ${r.frecuencia}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}