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

app.delete('/dresses', (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).send('Please provide the "id" parameter.');
    return;
  }
  db.run(
    'DELETE FROM dresses WHERE id = ?',
    [id],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(`Deleted dress with id ${id} from "dresses" database.`);
      }
    }
  );
});

app.put('/dresses', (req, res) => {
  const id = req.query.id;
  const { name, imgSrc, price, description } = req.body;
  if (!id || !name || !imgSrc || !price || !description) {
    res.status(400).send('Please provide all required fields.');
    return;
  }
  db.run(
    'UPDATE dresses SET name = ?, imgSrc = ?, price = ?, description = ? WHERE id = ?',
    [name, imgSrc, price, description, id],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Updated "dresses" database.');
      }
    }
  );
});

app.patch('/dresses', (req, res) => {
  const { id } = req.query;
  const updates = req.body;

  const setValues = Object.keys(updates).map(update => `${update} = ?`).join(', ');
  const values = Object.values(updates);

  db.run(`UPDATE dresses SET ${setValues} WHERE id = ?`, [...values, id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(`Dress with id ${id} updated successfully`);
    }
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});

//same with params will be - 
// app.get('/dresses/:id', (req, res) => {
//     const id = req.params.id
//     db.get('SELECT * FROM dresses WHERE id=?', [id], (err, data) => {
//         res.send(data)
//     }) 
// })


