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

const fs = require('fs');
const path = require('path');

const Appointment = require('./models/appointment');


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

app.get('/appointment', (req, res) => {
    const servicesFilePath = path.join(__dirname, 'public', 'data', 'services.json');
    
    fs.readFile(servicesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading services file');
        }
        const services = JSON.parse(data);
        res.render('appointment', { services: services });
    });
});

app.post('/appointment', (req, res) => {
    const { firstName, lastName, email, service, date, appointmentTime } = req.body;

    let appointmentDateTime = date;
    if (appointmentTime) {
        appointmentDateTime = new Date(`${date}T${appointmentTime}`);
    }

    const newAppointment = new Appointment({
        firstName,
        lastName,
        email,
        service,
        date: appointmentDateTime // Store the combined date and time
    });

    newAppointment.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error occurred while saving appointment');
        });
});

app.get('/appointment', (req, res) => {
    // Define the path to the services.json file
    const servicesFilePath = path.join(__dirname, 'public', 'data', 'services.json');

    // Read the services.json file
    fs.readFile(servicesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading services file');
        }

        // Parse the JSON data
        const services = JSON.parse(data);

        // Render the appointment page and pass the services data to it
        res.render('appointment', { services: services });
    });
});


app.get('/customer-list', (req, res) => {
    Customer.find({}).then(customers => {
        res.render('customer-list', { customers: customers });
    }).catch(err => {  // had to look up the newer way to use the find function for updated version of Mongoose
        console.error(err);
        res.status(500).send('Error occurred while fetching customers');
    });
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

app.get('/my-appointments', (req, res) => {
    res.render('my-appointments');
});

app.get('/api/appointments/:email', async (req, res) => {
    try {
      const email = req.params.email;
      let appointments = await Appointment.find({ email: email });
  
      res.json(appointments);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error occurred while fetching appointments');
    }
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