import mongoose from 'mongoose';
import Flight from './flight';

const terminalSchema = new mongoose.Schema({
    name: String,
    flights: [Flight.schema],
    capacity: String

});

const Terminal = mongoose.model('Terminal', terminalSchema);

module.exports = Terminal;
