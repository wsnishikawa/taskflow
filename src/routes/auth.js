const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Rota de Registro
router.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    const sql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
    db.run(sql, [email, password, name], function (err) {
        if (err) {
            return res.status(400).json({ error: 'Erro ao cadastrar. E-mail já existe?' });
        }
        res.json({ id: this.lastID, email, name });
    });
});

// Rota de Login (simplificada sem criptografia de senha conforme escopo de MVP rápido)
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT id, email, name FROM users WHERE email = ? AND password = ?';
    
    db.get(sql, [email, password], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }
        res.json(user); // Retorna os dados do user pro front
    });
});

module.exports = router;
