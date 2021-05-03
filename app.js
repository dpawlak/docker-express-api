const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const feedRoutes = require('./routes/feed')

const app = express()

app.use(bodyParser.json());

app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/', (req, res) => res.send('REST API'))

app.use('/feed',feedRoutes)

app.listen(process.env.PORT || 3000)
