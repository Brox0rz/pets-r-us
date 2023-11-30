 /*
============================================
; Title:  customer.js
; Contributing Authors: Professor Richard Krasso
; Author: Brock Hemsouvanh
; Date:   11/29/2023
; Description: Defining customers schema for the mongoose model to export/route the customer's input
; on the Pets-R-Us website.
;===========================================
*/ 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerSchema = new Schema({
    customerId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Customer', customerSchema);
