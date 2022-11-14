const express = require('express')
const { engine } = require('express-handlebars')
const port = process.env.PORT || 3003
const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')
const bodyParser = require('body-parser')

const app = express()

// Handlebars
app.engine(
  'handlebars',
  engine({
    extname: 'handlebars',
    // defaultLayout: false,
    layoutsDir: './views/layouts/',
    defaultLayout: 'main',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {}
        this._sections[name] = options.fn(this)
        return null
      }
    }
  })
)
app.set('view engine', 'handlebars')
app.set('views', './views')

// Handlers
app.get('/', handlers.home)
app.get('/about', handlers.about)

app.use(handlers.notFound)
app.use(handlers.serverError)

// configure middleware
app.use(express.static(__dirname + './public'))
app.use(bodyParser.urlencoded({ extended: true }))

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

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        ': press Ctrl-C to terminate.'
    )
  })
} else {
  module.exports = app
}
