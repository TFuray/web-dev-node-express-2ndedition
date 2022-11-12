const express = require('express')

const app = express()

const port = process.env.PORT || 3003

//custom 404 page
app.arguments((req, res) => {
    res.type
})