 /*
============================================
; Title:  index.js
; Contributing Authors: Professor Richard Krasso, Academind (source: https://www.youtube.com/watch?v=h4A0-53Olm4)
; Author: Brock Hemsouvanh
; Date:   11/29/2023
; Description: Importing modules containing arrays, and functions for a pet care website.
;===========================================
*/ 

const Customer = require('./models/customer');
const express = require('express');
const mongoose = require('mongoose');
const app = express();


const CONN = 'mongodb+srv://web340_admin:204L0bJE7sJJjbQQ@cluster0.1eekj05.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

mongoose.connect(CONN, {dbName: "petsDB"}).then(() => {  // This section authored by Professor Richard Krasso
  console.log('Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
});

app.use(express.urlencoded({ extended: true }));
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

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { customerId, email } = req.body;

    Customer.create({ customerId, email })
        .then(() => res.redirect('/')) // Redirect to the landing page upon success
        .catch(err => {
            console.error(err);
            res.status(500).send('Error occurred');
        });
});

app.post('/send-message', (req, res) => {
    const { email, message } = req.body;

    console.log(`Received message from ${email}: ${message}`);

    res.redirect('/');
});


app.listen(PORT, () => {
    console.log('Application started and listening on PORT: ' + PORT);
    console.log('\n  Press Ctrl+C to stop the server...');
});