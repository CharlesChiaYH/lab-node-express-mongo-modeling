import mongoose from 'mongoose';
import Passenger from './passenger';

const flightsSchema = new mongoose.Schema({
    from: String,
    to: String,
    airline: String,
    passengers: [Passenger.schema]

});

const Flight = mongoose.model('Flight', flightsSchema);

module.exports = Flight;
