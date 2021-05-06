const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const feedRoutes = require('./routes/feed');
const  mongoose  = require('mongoose');
const Post = require('./models/post')

const app = express()

app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/', (req, res) => {
    res.render('index', { title:"API", message:"Data Collection" })
})

app.post('/create-post', (req, res) => {
    const myData = new Post(req.body)
    myData.save()
    .then(item => {
        res.send("item saved to database...")
    })
    .catch(err => {
        res.status(400).send("unable to save to database!")
    })
})

app.use('/feed',feedRoutes)

// app.listen(process.env.PORT || 3000)

mongoose
.connect(
    'mongodb+srv://admin:test123@cluster0.lg2gs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
)
.then(result => {
    const server = app.listen(process.env.PORT || 3000)
    console.log('Connected to MongoDB...')
})
.catch(err => console.log(err))