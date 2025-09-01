// src/pages/Configuracion.js
import { useState } from 'react';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Divider,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Configuracion({ setModoOscuro }) {
  const [modoOscuroLocal, setModoOscuroLocal] = useState(false);
  const [alertasStock, setAlertasStock] = useState(true);
  const [mostrarUsuario, setMostrarUsuario] = useState(true);
  const [animaciones, setAnimaciones] = useState(true);

  const navigate = useNavigate();

  const guardarCambios = () => {
    setModoOscuro(modoOscuroLocal);
    // Podés guardar en localStorage si querés persistencia
    console.log('Preferencias guardadas:', {
      modoOscuroLocal,
      alertasStock,
      mostrarUsuario,
      animaciones,
    });
    navigate('/inicio');
  };

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
              checked={modoOscuroLocal}
              onChange={() => setModoOscuroLocal(!modoOscuroLocal)}
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

      <Button
        variant="contained"
        color="success"
        sx={{ marginTop: '2rem' }}
        onClick={guardarCambios}
      >
        Guardar y volver al inicio
      </Button>
    </Box>
  );
}