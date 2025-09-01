// src/pages/Resumen.js
import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export default function Resumen() {
  const [stock, setStock] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cantidadesEditadas, setCantidadesEditadas] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'medicamentos'), (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStock(datos);
      setCargando(false);
    });

    return () => unsub();
  }, []);

  const manejarCambio = (id, nuevaCantidad) => {
    setCantidadesEditadas((prev) => ({
      ...prev,
      [id]: nuevaCantidad,
    }));
  };

  const guardarCantidad = async (id) => {
    const cantidad = parseInt(cantidadesEditadas[id]);
    if (isNaN(cantidad)) return;

    try {
      const ref = doc(db, 'medicamentos', id);
      await updateDoc(ref, { cantidad });
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const eliminarMedicamento = async (id) => {
    try {
      await deleteDoc(doc(db, 'medicamentos', id));
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Stock disponible 📦
      </Typography>

      {cargando ? (
        <CircularProgress />
      ) : stock.length === 0 ? (
        <Typography>No hay medicamentos cargados.</Typography>
      ) : (
        <Grid container spacing={2}>
          {stock.map((med) => (
            <Grid item xs={12} sm={6} md={4} key={med.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{med.nombre}</Typography>

                  <TextField
                    label="Cantidad"
                    type="number"
                    value={cantidadesEditadas[med.id] ?? med.cantidad}
                    onChange={(e) => manejarCambio(med.id, e.target.value)}
                    fullWidth
                    sx={{ mt: 1 }}
                  />

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => guardarCantidad(med.id)}
                    >
                      Guardar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => eliminarMedicamento(med.id)}
                    >
                      Eliminar
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}