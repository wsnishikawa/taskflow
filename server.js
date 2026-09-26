const express = require('express');
const path = require('path');
const db = require('./src/database/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
const authRoutes = require('./src/routes/auth');
const tasksRoutes = require('./src/routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

// Servir o frontend (SPA - catch-all envia pro index.html)
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
