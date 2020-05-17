var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    name: String,
    date: Date,
    ticketData : []
});

var Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket