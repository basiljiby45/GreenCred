require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
//const balanceRoutes = require('./routes/balanceRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');

const path = require('path');

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dbms123',
    database: 'greencred',
    port: 3306,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to greencred MySQL database');
});

// Initializnaodbasiljib basiljibnjdke Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Middleware to attach db to every request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Use the signup routes
//app.use('/api/balance', balanceRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);

// Basic route for testing server
app.get('/', (req, res) => {
  res.send('GreenCred server is running');
});

// Start the server with error handling
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`Server running on port ${port}`);
});