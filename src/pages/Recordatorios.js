// src/pages/Recordatorios.js
import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';

export default function Recordatorios() {
  const [tipo, setTipo] = useState('toma');
  const [medicamento, setMedicamento] = useState('');
  const [horario, setHorario] = useState('');
  const [dias, setDias] = useState('');
  const [umbral, setUmbral] = useState('');
  const [activo, setActivo] = useState(true);
  const [recordatorios, setRecordatorios] = useState([]);

  const guardarRecordatorio = async () => {
    const nuevo = {
      tipo,
      medicamento,
      activo,
      creado: Timestamp.now(),
    };

    if (tipo === 'toma') {
      nuevo.horario = horario;
      nuevo.dias = dias;
    } else {
      nuevo.umbral = parseInt(umbral);
    }

    await addDoc(collection(db, 'recordatorios'), nuevo);
    setMedicamento('');
    setHorario('');
    setDias('');
    setUmbral('');
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'recordatorios'), (snap) => {
      const datos = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecordatorios(datos);
    });
    return () => unsub();
  }, []);

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Recordatorios ⏰
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tipo</InputLabel>
        <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <MenuItem value="toma">Tomar medicamento</MenuItem>
          <MenuItem value="compra">Comprar medicamento</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Medicamento"
        fullWidth
        value={medicamento}
        onChange={(e) => setMedicamento(e.target.value)}
        sx={{ mb: 2 }}
      />

      {tipo === 'toma' && (
        <>
          <TextField
            label="Horario (HH:mm)"
            fullWidth
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Días (ej: Lunes,Miércoles)"
            fullWidth
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            sx={{ mb: 2 }}
          />
        </>
      )}

      {tipo === 'compra' && (
        <TextField
          label="Umbral mínimo"
          type="number"
          fullWidth
          value={umbral}
          onChange={(e) => setUmbral(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}

      <FormControlLabel
        control={
          <Switch checked={activo} onChange={() => setActivo(!activo)} />
        }
        label="Activo"
      />

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={guardarRecordatorio}>
        Guardar recordatorio
      </Button>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Recordatorios activos
      </Typography>

      <Grid container spacing={2}>
        {recordatorios.map((rec) => (
          <Grid item xs={12} sm={6} md={4} key={rec.id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{rec.tipo === 'toma' ? 'Tomar' : 'Comprar'} {rec.medicamento}</Typography>
                {rec.tipo === 'toma' && (
                  <>
                    <Typography>Horario: {rec.horario}</Typography>
                    <Typography>Días: {rec.dias}</Typography>
                  </>
                )}
                {rec.tipo === 'compra' && (
                  <Typography>Umbral: {rec.umbral}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}