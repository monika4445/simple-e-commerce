const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log('Connected to the database.');
});

app.get('/books', (req, res) => {
  const id = req.query.id;
  if (id) {
    db.get(`SELECT * FROM books WHERE id=${id}`, (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else if (!data) {
        res.status(404).send('Book not found.');
      } else {
        res.send(data);
      }
    });
  } else {
    db.all('SELECT * FROM books', [], (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(data);
      }
    });
  }
});

app.post('/books', (req, res) => {
  const { name, date_published, page_count, imgSrc } = req.body;
  if (!name || !date_published || !page_count || !imgSrc ) {
    res.status(400).send('Please provide all required fields.');
    return;
  }
  db.run(
    'INSERT INTO books (name, date_published, page_count, imgSrc) VALUES (?, ?, ?, ?)',
    [name, date_published, page_count, imgSrc],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Inserted into "books" database.');
      }
    }
  );
});

app.listen(4000, () => {
  console.log('Server is listening on port 4000.');
});

   
// app.get('/books/:id', (req, res) => {
//     const id = req.params.id
//     db.get('SELECT * FROM books WHERE id=?', [id], (err, data) => {
//         res.send(data)
//     }) 
// })


