// src/pages/Inicio.js
import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  addDoc,
  Timestamp,
} from 'firebase/firestore';

export default function Inicio() {
  const [stockTotal, setStockTotal] = useState(0);
  const [recordatorios, setRecordatorios] = useState([]);
  const [cargandoStock, setCargandoStock] = useState(true);
  const [cargandoRecordatorios, setCargandoRecordatorios] = useState(true);
  const navigate = useNavigate();
  const fechaHoy = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  useEffect(() => {
    const unsubStock = onSnapshot(collection(db, 'medicamentos'), (snapshot) => {
      const datos = snapshot.docs.map((doc) => doc.data());
      const total = datos.reduce((acc, med) => acc + (med.cantidad || 0), 0);
      setStockTotal(total);
      setCargandoStock(false);
    });

    const unsubRecordatorios = onSnapshot(collection(db, 'recordatorios'), (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const activos = datos.filter((r) => r.activo);
      setRecordatorios(activos);
      setCargandoRecordatorios(false);
    });

    return () => {
      unsubStock();
      unsubRecordatorios();
    };
  }, []);

  const eliminarRecordatorio = async (id) => {
    try {
      await deleteDoc(doc(db, 'recordatorios', id));
    } catch (error) {
      console.error('Error al eliminar recordatorio:', error);
    }
  };

  const confirmarToma = async (rec) => {
    const yaTomado = rec.historial?.[fechaHoy] === true;
    if (yaTomado) return;

    try {
      // 1. Confirmar toma
      await updateDoc(doc(db, 'recordatorios', rec.id), {
        [`historial.${fechaHoy}`]: true,
      });

      // 2. Buscar medicamento por nombre
      const medsSnap = await getDocs(collection(db, 'medicamentos'));
      const medDoc = medsSnap.docs.find((doc) => doc.data().nombre === rec.medicamento);
      if (!medDoc) return;

      const medId = medDoc.id;
      const medData = medDoc.data();
      const nuevaCantidad = (medData.cantidad || 0) - 1;

      // 3. Actualizar stock
      await updateDoc(doc(db, 'medicamentos', medId), {
        cantidad: nuevaCantidad,
      });

      // 4. Verificar umbral y generar recordatorio de compra si no existe
      if (medData.umbral && nuevaCantidad <= medData.umbral) {
        const compraSnap = await getDocs(collection(db, 'recordatorios'));
        const yaExiste = compraSnap.docs.some(
          (doc) =>
            doc.data().tipo === 'compra' &&
            doc.data().medicamento === rec.medicamento
        );

        if (!yaExiste) {
          await addDoc(collection(db, 'recordatorios'), {
            tipo: 'compra',
            medicamento: rec.medicamento,
            umbral: medData.umbral,
            activo: true,
            creado: Timestamp.now(),
          });
        }
      }
    } catch (error) {
      console.error('Error al confirmar toma y descontar stock:', error);
    }
  };

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a BeeStock 🐝
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Tu sistema familiar para controlar medicamentos. ¡Gracias por confiar!
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#f1f8e9' }}>
            <CardContent>
              <Typography variant="h6">Stock total</Typography>
              {cargandoStock ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{stockTotal}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Acciones rápidas</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate('/agregar')}
              >
                Agregar medicamento
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate('/configuracion')}
              >
                Configuración
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {cargandoRecordatorios ? (
        <Box sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : recordatorios.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Recordatorios activos ⏰
          </Typography>

          <Grid container spacing={2}>
            {recordatorios.map((rec) => {
              const yaTomado = rec.historial?.[fechaHoy] === true;

              return (
                <Grid item xs={12} sm={6} md={4} key={rec.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1">
                        {rec.tipo === 'toma'
                          ? `Tomar ${rec.medicamento}`
                          : `Comprar ${rec.medicamento}`}
                      </Typography>

                      {rec.tipo === 'toma' && (
                        <>
                          <Typography>Horario: {rec.horario}</Typography>
                          <Typography>Días: {rec.dias}</Typography>

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={yaTomado}
                                disabled={yaTomado}
                                onChange={() => confirmarToma(rec)}
                              />
                            }
                            label={
                              yaTomado
                                ? 'Ya fue tomado hoy'
                                : 'Confirmar que fue tomado'
                            }
                            sx={{ mt: 1 }}
                          />
                        </>
                      )}

                      {rec.tipo === 'compra' && (
                        <Typography>Umbral: {rec.umbral}</Typography>
                      )}

                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={() => eliminarRecordatorio(rec.id)}
                      >
                        Eliminar
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography>No hay recordatorios activos.</Typography>
        </Box>
      )}
    </Box>
  );
}