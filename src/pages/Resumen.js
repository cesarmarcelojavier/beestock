// src/pages/Resumen.js
import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Resumen() {
  const [stock, setStock] = useState([]);
  const [cargando, setCargando] = useState(true);

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
                  <Typography color="text.secondary">
                    Cantidad: {med.cantidad}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}