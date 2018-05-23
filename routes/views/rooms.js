const keystone = require('keystone')

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  let locals = res.locals

  locals.section = 'rooms'

  view.query('rooms', keystone.list('Room').model.find())

  view.render('rooms')
}