import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
//import logger from 'morgan';
import mongoose from 'mongoose';
// import favicon from 'serve-favicon';
import path from 'path';
import lessMiddleware from 'less-middleware';
import index from './routes/index';


const app = express();
const debug = Debug('airport:app');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/airport');
console.log('connected');

//Import airport from './models/airport'//
import Airport from './model/airport';

//Import terminal from './models/'terminal//
import Terminal from './model/terminal';

//Import flight from './models/flight'//
import Flight from './model/flight';

//Import passenger from './models/passenger'//
import Passenger from './model/passenger';

//Create flight1//
let flight1 = new Flight({
    from: 'CDG France',
    to: 'JFK, New-York, USA',
    airline: 'American Airlines',
    passengers: []
});

//Save flight1 to database?//
flight1.save((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Flight1 saved');
});


//Create flight2//
let flight2 = new Flight({
    from: 'Heathrow UK',
    to: 'JFK, New York, USA',
    airline: 'British Airways',
    passengers: []
});

//Save flight2 to database?//
flight2.save((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Flight2 saved');
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}



//Create Airport//
let airport1 = new Airport({
    name: 'JFK',
    country: 'USA',
    terminal: [],
    opened: randomDate(new Date(1990, 0, 1), new Date())
});
//save airport1 to database?//
airport1.save((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('airport1 saved');
});

//Create Terminal//
let terminal1 = new Terminal({
    name: 'Terminal1',
    flights: [flight1, flight2],
    capacity: '234324'
});
//Push terminal1 to airport1?//
airport1.terminal.push(terminal1);
console.log(airport1.name);

//save terminal1 to database?//
terminal1.save((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('terminal1 saved');
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
    debug('Caught exception: %j', err);
    process.exit(1);
});

export default app;
