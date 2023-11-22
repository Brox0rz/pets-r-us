 /*
============================================
; Title:  index.js
; Author: Brock Hemsouvanh
; Date:   11/11/2023
; Description: Importing modules containing arrays, and functions for a pet care website.
;===========================================
*/ 

const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index'); // Renders views/index.ejs
});

app.get('/grooming', (req, res) => {
  res.render('grooming'); // Renders views/grooming.ejs
});

app.get('/training', (req, res) => {
  res.render('training'); // Renders views/training.ejs
});

app.get('/boarding', (req, res) => {
  res.render('boarding'); // Renders views/boarding.ejs
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});


