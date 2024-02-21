const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'weather'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.use(cors());

app.get('/cities', (req, res) => {
  const query = 'SELECT name FROM cities';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener las ciudades' });
      return;
    }
    const cities = results.map((row) => row.name);
    res.json(cities);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));