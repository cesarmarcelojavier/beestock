// src/App.js
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
  Box,
  Container,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react';

import Splash from './pages/Splash';
import Inicio from './pages/Inicio';
import Agregar from './pages/Agregar';
import Resumen from './pages/Resumen';
import Recordatorios from './pages/Recordatorios';
import Login from './pages/Login';

function NavigationDrawer({ onLogout, usuarioActivo }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/inicio' },
    { text: 'Agregar Medicamento', icon: <AddCircleIcon />, path: '/agregar' },
    { text: 'Resumen de Stock', icon: <InventoryIcon />, path: '/resumen' },
    { text: 'Recordatorios', icon: <NotificationsIcon />, path: '/recordatorios' },
    { text: 'Configuración', icon: <SettingsIcon />, path: '/configuracion' },
    { text: 'Exportar Datos', icon: <FileDownloadIcon />, path: '/exportar' },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BeeStock 🐝
          </Typography>
          <Typography variant="body1" sx={{ marginRight: '1rem' }}>
            {usuarioActivo?.nombre}
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('usuarioActivo');
    if (guardado) {
      setUsuarioActivo(JSON.parse(guardado));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    setUsuarioActivo(null);
    navigate('/login');
  };

  return (
    <>
      {usuarioActivo && <NavigationDrawer onLogout={cerrarSesion} usuarioActivo={usuarioActivo} />}
      <Container maxWidth="md" sx={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          {usuarioActivo ? (
            <>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/agregar" element={<Agregar />} />
              <Route path="/resumen" element={<Resumen />} />
              <Route path="/recordatorios" element={<Recordatorios />} />
              <Route path="/configuracion" element={<div>Configuración (próximamente)</div>} />
              <Route path="/exportar" element={<div>Exportar Datos (próximamente)</div>} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </Container>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;