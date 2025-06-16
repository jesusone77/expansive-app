const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ user: username }, 'secreto123', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

module.exports = router;
