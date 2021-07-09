const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const feedRoutes = require('./routes/feed');
const  mongoose  = require('mongoose');

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
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
    res.render('index', { title:"Job", message:"Work Order" })
})

app.use('/feed', feedRoutes)

mongoose
.connect(
    'mongodb+srv://admin:test123@cluster0.lg2gs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
)
.then(result => {
    const server = app.listen(process.env.PORT || 3000)
    console.log('Connected to MongoDB...')
})
.catch(err => console.log(err))