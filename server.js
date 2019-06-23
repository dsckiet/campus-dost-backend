const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/dbconnection');

const app = express();

app.use(express.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/api/club', require('./routes/api/club'));
app.get('/api/department', require('./routes/api/department'));
app.get('/api/hostel', require('./routes/api/hostel'));
app.get('/api/importantFunctionary', require('./routes/api/importantFunctionary'));

app.get('*', (req, res) => {
	res.status(200).json({ message: 'no api found' });
});

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error in running server");
        return;
    }
    console.log(`Server is up and running on port ${process.env.PORT}`);
});
