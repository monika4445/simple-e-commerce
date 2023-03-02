const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Use CORS middleware
app.use(cors());

const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log('Connected to the database.');
});

app.get('/dresses', (req, res) => {
  const id = req.query.id;
  if (id) {
    db.get(`SELECT * FROM dresses WHERE id=${id}`, (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else if (!data) {
        res.status(404).send('Dress not found.');
      } else {
        res.send(data);
      }
    });
  } else {
    db.all('SELECT * FROM dresses', [], (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(data);
      }
    });
  }
});

app.post('/dresses', (req, res) => {
  const { name, imgSrc, price, description } = req.body;
  if (!name || !imgSrc || !price || !description ) {
    res.status(400).send('Please provide all required fields.');
    return;
  }
  db.run(
    'INSERT INTO dresses (name, imgSrc, price, description) VALUES (?, ?, ?, ?)',
    [name, imgSrc, price, description],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Inserted into "dresses" database.');
      }
    }
  );
});

app.listen(4000, () => {
  console.log('Server is listening on port 4000.');
});

   
// app.get('/dresses/:id', (req, res) => {
//     const id = req.params.id
//     db.get('SELECT * FROM dresses WHERE id=?', [id], (err, data) => {
//         res.send(data)
//     }) 
// })


