const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use('/',(req,res) => res.send('Goodbye!'));
app.use(passport.initialize());
app.use('/api/users', users);
app.use('/api/tweets', tweets);

const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connected to MongoDB successfully!')).catch(err => console.log(err));
// mongoose.set('strictQuery', false);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}...`))
