// src/pages/Usuarios.js
import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

export default function Usuarios() {
  const [correo, setCorreo] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [confirmacion, setConfirmacion] = useState('');

  const validarCorreo = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const manejarInvitacion = () => {
    if (!validarCorreo(correo)) {
      setError('Correo inválido');
      setConfirmacion('');
      return;
    }

    setUsuarios((prev) => [...prev, correo]);
    setConfirmacion(`Invitación enviada a ${correo}`);
    setError('');
    setCorreo('');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Invitar usuario
      </Typography>

      <TextField
        label="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <Button variant="contained" color="primary" onClick={manejarInvitacion}>
        Enviar invitación
      </Button>

      {error && <Alert severity="error" sx={{ marginTop: '1rem' }}>{error}</Alert>}
      {confirmacion && <Alert severity="success" sx={{ marginTop: '1rem' }}>{confirmacion}</Alert>}

      {usuarios.length > 0 && (
        <Paper sx={{ marginTop: '2rem' }}>
          <Typography variant="h6" sx={{ padding: '1rem' }}>
            Usuarios invitados
          </Typography>
          <List>
            {usuarios.map((u, index) => (
              <ListItem key={index}>
                <ListItemText primary={u} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}