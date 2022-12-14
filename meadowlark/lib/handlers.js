const fortune = require('./fortune')
exports.api = {}

exports.home = (req, res) => {
  res.render('home')
}

exports.about = (req, res) => {
  res.render('about', { fortune: fortune.getFortune() })
}

/* eslint-enable no-unused-vars */
exports.newsletterSignup = (req, res) => {
  // CSRF will come later for now dummy value
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

// Newsletter old way route
exports.newsletterSignupProcess = (req, res) => {
  console.log('Form (from querystring): ' + req.query.form)
  console.log('CSRF token (from hidden form field): ' + req.body._csrf)
  console.log('Name (from visible form field): ' + req.body.name)
  console.log('Email (from visible form field): ' + req.body.email)
  res.redirect(303, '/newsletter-signup/thank-you')
}
exports.newsletterSignupThankYou = (req, res) => {
  res.render('newsletter-signup-thank-you')
}

// these handlers are for fetch/JSON form handlers
exports.newsletter = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render('newsletter', { csrf: 'CSRF token goes here' })
}
exports.api.newsletterSignup = (req, res) => {
  console.log('CSRF token (from hidden form field): ' + req.body._csrf)
  console.log('Name (from visible form field): ' + req.body.name)
  console.log('Email (from visible form field): ' + req.body.email)
  res.send({ result: 'success' })
}

// Vacation photos route
exports.vacationPhotoContest = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo', {
    year: now.getFullYear(),
    month: now.getMonth()
  })
}
exports.vacationPhotoContestAjax = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo-ajax', {
    year: now.getFullYear(),
    month: now.getMonth()
  })
}
exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log(`field data:`, fields)
  console.log('files:', files)
  res.redirect(303, '/contest/vacation-photo-thank-you')
}
exports.vacationPhotoContestProcessError = (req, res, fields, files) => {
  res.redirect(303, '/contest/vacation-photo-error')
}
exports.vacationPhotoContestProcessThankYou = (req, res) => {
  res.render('contest/vacation-photo-thank-you')
}
exports.api.vacationPhotoContest = (req, res, fields, files) => {
  console.log('field data:', fields)
  console.log('files: ', files)
  res.send({ result: 'success' })
}
exports.api.cacationPhotoContestError = (req, res, message) => {
  res.send({ result: 'error', error: message})
}

// Error routes
exports.notFound = (req, res) => {
  res.render('404')
}

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
  res.render('500')
}
