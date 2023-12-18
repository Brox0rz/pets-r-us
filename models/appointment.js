 /*
============================================
; Title:  appointment.js
; Contributing Authors: Professor Richard Krasso
; Author: Brock Hemsouvanh
; Date:   12/6/2023
; Description: Defining customers schema for the mongoose model to export/route the customer's 
appointment booking input on the Pets-R-Us website.
;===========================================
*/ 

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    service: String,
    date: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
