const express = require('express');
const cors = require('cors')
const back = require('express-back');
const session = require('express-session')
const fs = require('fs')
const path = require('path');
const hbs = require('express-handlebars')
const fileUpload = require('express-fileupload')
var bodyParser = require('body-parser')
// const hijriSafe= require('hijri-date/lib/safe');
// const HijriDate =  hijriSafe.default;
// const toHijri   = hijriSafe.toHijri;

// Middleware
const app = express();
app.use(cors())
app.use(session({
  secret: 'super-secret',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(back());
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }));

// View engine
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'home', layoutsDir: __dirname + '/views'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(__dirname + './views'));
app.use(express.static(__dirname + './pubic'))

// Routes
const api = require('./routes/api')
app.use(api)

const pdf = require('./routes/downloads')
app.use(pdf)

const timetableUploads = require('./routes/timetable-upload')
app.use(timetableUploads)

const pdfUploads = require('./routes/pdf-uploads')
app.use(pdfUploads)

const notifications = require('./routes/notifications')
app.use(notifications)

const notfiUploads = require('./routes/notfi-uploads')
app.use(notfiUploads)

const askImam = require('./routes/ask-imam')
app.use(askImam)

const dashboard = require('./routes/home')
app.use(dashboard)

const port = 8080;
app.listen(port, () => console.log(`Server is runing on ${port}!`))