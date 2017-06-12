import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    dob: Date

});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
