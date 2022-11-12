const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

const port = process.env.PORT || 3003

// configure handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

