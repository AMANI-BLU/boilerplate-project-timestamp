// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/:date?', (req, res) => {
    const { date } = req.params;

    let dateObject;

    // Check if date is a valid timestamp or a date string
    if (!date) {
        dateObject = new Date(); // Current date if no date is provided
    } else if (!isNaN(date)) {
        dateObject = new Date(Number(date)); // Convert timestamp to date
    } else {
        dateObject = new Date(date); // Try to create a date from the string
    }

    // Check if the date is valid
    if (dateObject.toString() === 'Invalid Date') {
        return res.status(400).json({ error: 'Invalid Date' });
    }

    // Return the JSON object with both unix and utc keys
    res.json({
        unix: dateObject.getTime(),
        utc: dateObject.toUTCString()
    });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
