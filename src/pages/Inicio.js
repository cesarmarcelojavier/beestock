// src/pages/Inicio.js
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

export default function Inicio() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [formulario, setFormulario] = useState({});
  const UMBRAL_STOCK_BAJO = 10;

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('medicamentos')) || [];
    setMedicamentos(guardados);
  }, []);

  const iniciarEdicion = (index) => {
    setEditandoIndex(index);
    setFormulario({ ...medicamentos[index] });
  };

  const cancelarEdicion = () => {
    setEditandoIndex(null);
    setFormulario({});
  };

  const guardarCambios = () => {
    const actualizados = [...medicamentos];
    actualizados[editandoIndex] = formulario;
    localStorage.setItem('medicamentos', JSON.stringify(actualizados));
    setMedicamentos(actualizados);
    cancelarEdicion();
  };

  const manejarCambio = (campo, valor) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  };

  const manejarCambioRecordatorio = (campo, valor) => {
    setFormulario((prev) => ({
      ...prev,
      recordatorio: {
        ...prev.recordatorio,
        [campo]: valor,
      },
    }));
  };

  const manejarEncargado = (index, valor) => {
    const actualizados = [...medicamentos];
    actualizados[index].encargado = valor;
    localStorage.setItem('medicamentos', JSON.stringify(actualizados));
    setMedicamentos(actualizados);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Medicamentos en Stock
      </Typography>

      {medicamentos.length === 0 ? (
        <Typography>No hay medicamentos registrados.</Typography>
      ) : (
        <Paper>
          <List>
            {medicamentos.map((m, index) => (
              <ListItem
                key={index}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                {editandoIndex === index ? (
                  <>
                    <TextField
                      label="Nombre"
                      value={formulario.nombre}
                      onChange={(e) => manejarCambio('nombre', e.target.value)}
                      fullWidth
                      sx={{ marginBottom: '0.5rem' }}
                    />
                    <TextField
                      label="Cantidad en stock"
                      type="number"
                      value={formulario.cantidad}
                      onChange={(e) => manejarCambio('cantidad', e.target.value)}
                      fullWidth
                      sx={{ marginBottom: '0.5rem' }}
                    />
                    <TextField
                      label="Cantidad a comprar"
                      type="number"
                      value={formulario.cantidadAComprar}
                      onChange={(e) => manejarCambio('cantidadAComprar', e.target.value)}
                      fullWidth
                      sx={{ marginBottom: '0.5rem' }}
                    />
                    <TextField
                      label="Fecha de compra"
                      type="date"
                      value={formulario.fechaCompra}
                      onChange={(e) => manejarCambio('fechaCompra', e.target.value)}
                      fullWidth
                      sx={{ marginBottom: '0.5rem' }}
                      InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                      label="Hora de recordatorio"
                      type="time"
                      value={formulario.recordatorio?.hora || ''}
                      onChange={(e) => manejarCambioRecordatorio('hora', e.target.value)}
                      fullWidth
                      sx={{ marginBottom: '0.5rem' }}
                      InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                      label="Frecuencia"
                      value={formulario.recordatorio?.frecuencia || ''}
                      onChange={(e) => manejarCambioRecordatorio('frecuencia', e.target.value)}
                      fullWidth
                      sx={{ marginBottom: '0.5rem' }}
                    />

                    <Box sx={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <Button variant="contained" onClick={guardarCambios}>
                        Guardar
                      </Button>
                      <Button variant="outlined" onClick={cancelarEdicion}>
                        Cancelar
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={m.nombre}
                      secondary={`Stock: ${m.cantidad} | Cantidad a comprar: ${m.cantidadAComprar} | Compra: ${m.fechaCompra}`}
                    />
                    {m.cantidad < UMBRAL_STOCK_BAJO && (
                      <Box sx={{ color: 'red', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        ⚠️ Stock bajo
                      </Box>
                    )}
                    {m.cantidad < UMBRAL_STOCK_BAJO && (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={m.encargado || false}
                            onChange={(e) => manejarEncargado(index, e.target.checked)}
                          />
                        }
                        label="Encargado"
                        sx={{ marginTop: '0.5rem' }}
                      />
                    )}
                    {m.recordatorio && (
                      <Typography variant="body2" sx={{ marginTop: '0.3rem' }}>
                        🕒 Recordatorio: {m.recordatorio.hora} ({m.recordatorio.frecuencia})
                      </Typography>
                    )}
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => iniciarEdicion(index)}
                      sx={{ marginTop: '0.5rem' }}
                    >
                      ✏️ Editar
                    </Button>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}