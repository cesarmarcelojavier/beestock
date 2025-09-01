// src/pages/Resumen.js
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
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

const medicamentos = [
  { nombre: 'Paracetamol', cantidad: 20 },
  { nombre: 'Ibuprofeno', cantidad: 15 },
  { nombre: 'Amoxicilina', cantidad: 10 },
  { nombre: 'Loratadina', cantidad: 8 },
];

export default function Resumen() {
  const data = {
    labels: medicamentos.map((m) => m.nombre),
    datasets: [
      {
        label: 'Cantidad de pastillas',
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
              <TableCell align="right">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicamentos.map((m) => (
              <TableRow key={m.nombre}>
                <TableCell>{m.nombre}</TableCell>
                <TableCell align="right">{m.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Bar data={data} options={options} />
    </Container>
  );
}