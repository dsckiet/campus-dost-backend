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

app.use('/api/club', require('./routes/api/club'));
app.use('/api/department', require('./routes/api/department'));
app.use('/api/hostel', require('./routes/api/hostel'));
app.use('/api/importantFunctionary', require('./routes/api/importantFunctionary'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

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
