const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3000;

const USER_EMAIL = 'user@exemplo.com';
const USER_PASSWORD = '123456';
const JWT_SECRET = '23aa3453df'

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === USER_EMAIL && senha === USER_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ erro: 'Credenciais inválidas' });
  }
});

app.get('/status', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.json({ authenticated: false });
  }

  jwt.verify(token, JWT_SECRET, (err) => {
    res.json({ authenticated: !err });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
