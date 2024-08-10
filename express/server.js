const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const url = 'mongodb+srv://aimee4312:6szKCxR38roikrIO@hayday.f56ka.mongodb.net/';
const dbName = 'goods';

let db;

MongoClient.connect(url)
    .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName);
    })
    .catch(error => console.error(error));


// GET
app.get('/api/status', (req, res) => {
    if (db) {
        res.json({ status: 'Connected to MongoDB' });
    } else {
        res.status(500).json({ status: 'Not connected to MongoDB' });
    }
    });

app.get('/api/resources', async (req, res) => {
    try {
        const resources = await db.collection('resources').find().toArray();
        res.json(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ error: 'Failed to fetch resources' });
    }
});

app.get('/api/bakery', async (req, res) => {
    try {
        const bakery = await db.collection('bakery').find().toArray();
        res.json(bakery);
    } catch (error) {
        console.error('Error fetching bakery:', error);
        res.status(500).json({ error: 'Failed to fetch bakery' });
    }
});

// POST
app.post('/api/bakery', async (req, res) => {
    try {
      const newBakeryItems = req.body;
      const result = await db.collection('bakery').insertMany(newBakeryItems);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to insert bakery items' });
    }
});

app.post('/api/bbqgrill', async (req, res) => {
    try {
      const newBbqGrillItems = req.body;
      const result = await db.collection('bbq grill').insertMany(newBbqGrillItems);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to insert bbq grill items' });
    }
});

// DELETE
app.delete('/api/bakery', async (req, res) => {
    try {
      const result = await db.collection('bakery').deleteMany({});
      res.status(200).json({ deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete documents' });
    }
});
  
  
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });