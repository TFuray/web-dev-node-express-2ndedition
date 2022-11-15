module.exports = (req, res, next) => {
  //if theres a flash message, transfer to context then clear
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
}
