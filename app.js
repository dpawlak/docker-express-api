const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello Daniel!'))

app.listen(3000, () => {
    console.log('My rest api running on port 3000!')
})