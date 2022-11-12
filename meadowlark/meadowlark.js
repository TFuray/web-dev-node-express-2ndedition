const express = require('express')
const { engine } = require('express-handlebars')
const fortune = require('./lib/fortune')


const app = express()

// Handlebars
app.engine(
  "handlebars",
  engine({
    extname: "handlebars",
    // defaultLayout: false,
    layoutsDir: "./views/layouts/",
    defaultLayout: 'main',
  })
)
app.set("view engine", "handlebars")
app.set("views", "./views")

const port = process.env.PORT || 3003

// configure middleware
app.use(express.static(__dirname + '/public'))

// @route --- home
app.get('/', (req, res) => {
  res.render('home')
})

// @route --- about
app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() })
})

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})