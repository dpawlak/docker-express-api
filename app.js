const express = require('express')
const bodyParser = require('body-parser');

const path = require('path')
const cors = require('cors');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth')
const  mongoose  = require('mongoose');
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const User = require('./models/user')

const app = express()



app.use(express.static(__dirname + "/public"));
app.use(bodyParser())

app.set('view engine', 'pug')

// express session middleware
app.use(session({
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true,
}))

// express messages middleware
app.use(require('connect-flash')())
app.use(function (req,res,next) {
    res.locals.messages = require('express-messages')(req,res)
    next()
})

app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/', (req, res) => {
    res.render('index')
})



mongoose
.connect(
    'mongodb+srv://admin:test123@cluster0.lg2gs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
)
.then(result => {
    const server = app.listen(process.env.PORT || 3000)
    console.log('Connected to MongoDB...')
})
.catch(err => console.log(err))
