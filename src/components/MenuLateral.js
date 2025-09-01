// src/components/MenuLateral.js
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useNavigate } from 'react-router-dom';

export default function MenuLateral() {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const opciones = [
    { texto: 'Inicio', ruta: '/inicio', icono: <HomeIcon /> },
    { texto: 'Agregar medicamento', ruta: '/agregar', icono: <AddCircleIcon /> },
    { texto: 'Stock disponible', ruta: '/resumen', icono: <InventoryIcon /> },
    { texto: 'Recordatorios', ruta: '/recordatorios', icono: <AccessAlarmIcon /> },
    { texto: 'Configuración', ruta: '/configuracion', icono: <SettingsIcon /> },
  ];

  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setAbierto(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setAbierto(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BeeStock 🐝
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={abierto}
        onClose={() => setAbierto(false)}
        PaperProps={{
          sx: {
            width: 250,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 100 100'%3E%3Cpolygon points='50,0 100,25 100,75 50,100 0,75 0,25' fill='%23e8f5e9'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '60px',
            transition: 'transform 0.4s ease-in-out',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem', backgroundColor: '#c5e1a5' }}>
            <LocalPharmacyIcon sx={{ marginRight: '0.5rem' }} />
            <Typography variant="h6">BeeStock</Typography>
          </Box>

          <Divider />

          <List>
            {opciones.map((opcion) => (
              <ListItem button key={opcion.texto} onClick={() => manejarNavegacion(opcion.ruta)}>
                <ListItemIcon>{opcion.icono}</ListItemIcon>
                <ListItemText primary={opcion.texto} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }} />

          <Divider />

          <Box sx={{ padding: '1rem', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Marcelo · Admin
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}