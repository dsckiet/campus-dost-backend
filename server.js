const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const logger = require("morgan");


require('dotenv').config();
require('./config/dbconnection');

const app = express();

app.use(express.urlencoded({
    extended: false
}));
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/club', require('./routes/api/club'));
app.use('/api/department', require('./routes/api/department'));
app.use('/api/hostel', require('./routes/api/hostel'));
app.use('/api/importantFunctionary', require('./routes/api/importantFunctionary'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/notice', require('./routes/api/notice'));

// const Department = require('./models/Department');

// Department.create([
//     {name: "Computer Science & Engineering"},
//     {name: "Computer Science"},
//     {name: "Information Technology"},
//     {name: "Computer Science & Information Technology"},
//     {name: "Electronics & Communication"},
//     {name: "Electrical & Electronics Engineering"},
//     {name: "Electronics & Instrumentation Engineering"},
//     {name: "Mechanical Engineering"},
//     {name: "Civil Engineering"},
//     {name: "KIET School of Pharmacy"},
//     {name: "KIET School of Management"},
//     {name: "Department of Computer Applications"},
//     {name: "Applied Science"}
// ])

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
