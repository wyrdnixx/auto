const express = require('express');
//const sqlite3 = require('sqlite3').verbose();
const sqlite3 = require('better-sqlite3');
//const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
//const db = new sqlite3.Database('database.db');

const path = require('path');
const dbPath = path.resolve(__dirname, 'database.db'); // Adjust the filename as needed


const db = new sqlite3(dbPath);


// Enable CORS for all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



db.exec('CREATE TABLE IF NOT EXISTS darlehen (id INTEGER PRIMARY KEY, datum DATE, betrag NUMERIC)')
db.exec('CREATE TABLE IF NOT EXISTS tilgung (id INTEGER PRIMARY KEY, datum DATE, betrag NUMERIC, validated DATE)')




app.use(express.json());
app.use(express.static('../frontend/dist'))

// Define routes for getting and setting items
app.get('/api/darlehen', (req, res) => {
  const query = 'SELECT * FROM darlehen where id = 1';
  const rows = db.prepare(query).all();
  res.json(rows);
});

app.get('/api/tilgung', (req, res) => {
  const query = 'SELECT * FROM tilgung';
  const rows = db.prepare(query).all();
  res.json(rows);
});



// Define an API endpoint for inserting data
app.post('/api/addTilgung', (req, res) => {
  const { datum, betrag } = req.body;
  console.log(req.body);
  if (!betrag || !datum) {
    return res.status(400).json({ error: 'field [datum] and [betrag] are required.' });
  }
  
  //const query = 'INSERT INTO items (name) VALUES (?)';
  const query = 'INSERT INTO tilgung (datum, betrag) VALUES ( ?, ?);';
  const stmt = db.prepare(query);

  try {
    stmt.run(datum, betrag);
    res.status(201).json({ message: 'Entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating entry' });
  }
});

// Define an API endpoint for inserting data
app.post('/api/deleteTilgung', (req, res) => {
  
  console.log("deleting: ", req.body);
  
  const placeholders = req.body.map((id) => '?').join(', ');
  const stmt = db.prepare(`DELETE FROM tilgung WHERE id IN (${placeholders})`);
  
  try {      

    // Execute the query
    const result = stmt.run(req.body);
    
    // Process the results
    if (result.changes > 0) {
      console.log(`Deleted ${result.changes} rows from the tilgung table.`);
      res.status(201).json({ message: 'Deleted entrys: '+ result.changes });
    } else {
      console.log(`No rows were deleted from the tilgung table.`);
      res.status(500).json({ error: 'No rows were deleted from the tilgung table.`'});
    }    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting entry: '+ error });
  }
});



// Define an API endpoint for inserting data
app.post('/api/darlehen', (req, res) => {
  const { datum, betrag } = req.body;

  if (!betrag || !datum) {
    return res.status(400).json({ error: 'field [datum] and [betrag] are required.' });
  }

  //const query = 'INSERT INTO items (name) VALUES (?)';
  const query = 'INSERT OR REPLACE INTO darlehen (id, datum, betrag) VALUES (1, ?, ?);';
  const stmt = db.prepare(query);

  try {
    stmt.run(datum, betrag);
    res.status(201).json({ message: 'Entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating entry' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
