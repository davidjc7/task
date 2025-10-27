import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite requisições de outros domínios (para o frontend)
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.send('API do TodoList com Node.js, Express e Prisma está no ar!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});