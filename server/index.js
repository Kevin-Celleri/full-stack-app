const express = require('express');
const path = require('path');
const pool = require('./queries');

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/links', async (req, res) => {
  try {
    const allLinks = await pool.query('SELECT * FROM links ORDER BY id ASC');
    res.json(allLinks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/links', async (req, res) => {
  try {
    const { name, url } = req.body;

    const newLink = await pool.query(
      'INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *',
      [name, url]
    );

    res.json(newLink.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
app.delete('/links/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log('DELETE route hit with id:', id);
  
      await pool.query('DELETE FROM links WHERE id = $1', [id]);
  
      res.json('Link deleted');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});