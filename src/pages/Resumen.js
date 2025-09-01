// src/pages/Resumen.js
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Resumen() {
  const [medicamentos, setMedicamentos] = useState([]);
  const UMBRAL_STOCK_BAJO = 10;

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('medicamentos')) || [];
    setMedicamentos(guardados);
  }, []);

  const data = {
    labels: medicamentos.map((m) => m.nombre),
    datasets: [
      {
        label: 'Cantidad en stock',
        data: medicamentos.map((m) => m.cantidad),
        backgroundColor: '#fdd835',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Resumen de Stock',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5 },
      },
    },
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Resumen de Stock
      </Typography>

      <Paper sx={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medicamento</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Cantidad a comprar</TableCell>
              <TableCell align="right">Fecha de compra</TableCell>
              <TableCell align="center">Encargado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicamentos.map((m, index) => (
              <TableRow key={index}>
                <TableCell>{m.nombre}</TableCell>
                <TableCell
                  align="right"
                  sx={m.cantidad < UMBRAL_STOCK_BAJO ? { color: 'red', fontWeight: 'bold' } : {}}
                >
                  {m.cantidad}
                  {m.cantidad < UMBRAL_STOCK_BAJO && ' ⚠️'}
                </TableCell>
                <TableCell align="right">{m.cantidadAComprar}</TableCell>
                <TableCell align="right">{m.fechaCompra}</TableCell>
                <TableCell align="center">
                  {m.encargado ? (
                    <Chip label="Encargado" color="success" size="small" />
                  ) : (
                    <Chip label="Pendiente" color="warning" size="small" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Bar data={data} options={options} />
    </Container>
  );
}