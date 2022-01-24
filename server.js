const express = require('express');
const expressLayout = require('express-ejs-layouts');
const  path  = require('path');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')


dotenv.config({path: "./config/config.env"});

const PORT = 3000;

const app = express();
connectDB();




app.use(expressLayout);
app.set('view engine', 'ejs');
app.use(express.json())
app.use(cookieParser())

app.use(express.static(__dirname + '/public'));

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(PORT, () => {
    console.log("Server started at" + PORT)
})