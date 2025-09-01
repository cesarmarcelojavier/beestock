// src/pages/Configuracion.js
import { useState } from 'react';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Divider,
} from '@mui/material';

export default function Configuracion() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [alertasStock, setAlertasStock] = useState(true);
  const [mostrarUsuario, setMostrarUsuario] = useState(true);
  const [animaciones, setAnimaciones] = useState(true);

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Configuración ⚙️
      </Typography>

      <Divider sx={{ marginBottom: '1rem' }} />

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={modoOscuro}
              onChange={() => setModoOscuro(!modoOscuro)}
            />
          }
          label="Modo oscuro"
        />

        <FormControlLabel
          control={
            <Switch
              checked={alertasStock}
              onChange={() => setAlertasStock(!alertasStock)}
            />
          }
          label="Alertas de stock bajo"
        />

        <FormControlLabel
          control={
            <Switch
              checked={mostrarUsuario}
              onChange={() => setMostrarUsuario(!mostrarUsuario)}
            />
          }
          label="Mostrar nombre del usuario"
        />

        <FormControlLabel
          control={
            <Switch
              checked={animaciones}
              onChange={() => setAnimaciones(!animaciones)}
            />
          }
          label="Animaciones activadas"
        />
      </FormGroup>
    </Box>
  );
}