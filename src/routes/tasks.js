const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Listar todas as tarefas de um usuário (inclui métricas)
router.get('/', (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(401).json({ error: 'Usuário não identificado' });

    db.all('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Criar nova tarefa
router.post('/', (req, res) => {
    const { user_id, title, description, deadline, type, priority } = req.body;
    
    if (!user_id || !title) return res.status(400).json({ error: 'ID do usuário e título são obrigatórios' });

    const sql = `INSERT INTO tasks (user_id, title, description, deadline, type, priority) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
                 
    db.run(sql, [user_id, title, description, deadline, type, priority || 'média'], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID, title, status: 'pendente' });
    });
});

// Atualizar status de uma tarefa
router.put('/:id', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE tasks SET status = ? WHERE id = ?';
    db.run(sql, [status, id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Tarefa atualizada com sucesso', changes: this.changes });
    });
});

// Excluir tarefa
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.run(sql, [id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Tarefa excluída', changes: this.changes });
    });
});

module.exports = router;
