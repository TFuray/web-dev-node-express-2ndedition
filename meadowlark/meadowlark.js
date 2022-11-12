const express = require('express')
const { engine } = require('express-handlebars')


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


//fortures for main page
const fortunes = [
  'Conquer your fears or they wil conquer you.',
  'Rivers need springs.',
  "Do not fear what you don't know.",
  'You wil have a pleasant surprise',
  'Whenever possible, keep it simple.'
]

// configure middleware
app.use(express.static(__dirname + '/public'))

// @route --- home
app.get('/', (req, res) => {
  res.render('home')
})

// @route --- about
app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', { fortune: randomFortune })
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