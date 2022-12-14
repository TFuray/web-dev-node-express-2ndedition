const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const { credentials } = require('./config')
const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')
const flashMiddleware = require('./lib/middleware/flash')

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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}))

const port = process.env.PORT || 3003

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddlware)
app.use(flashMiddleware)

// handler for home
app.get('/', handlers.home)

// handlers for browser-based form submission
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// handlers for fetch/JSON form submission
app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

//handlers for photo submission
app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message })
    console.log('got fields: ', fields)
    console.log('and files: ', files)
    handlers.vacationPhotoContestProcess(req, res, fields, files)
  })
})
app.get(
  '/contest/vacation-photo-thank-you',
  handlers.vacationPhotoContestProcessThankYou
)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if (err)
      return handlers.api.vacationPhotoContestError(req, res, err.message)
    handlers.api.vacationPhotoContest(req, res, fields, files)
  })
})

// handlers for errors
app.use(handlers.notFound)
app.use(handlers.serverError)

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        '; press Ctrl-C to terminate.'
    )
  })
} else {
  module.exports = app
}
