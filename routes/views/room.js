const keystone = require('keystone')

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  let locals = res.locals

  locals.section = 'rooms'
  locals.filters = {
    room: req.params.room
  }

  locals.data = {
    rooms: []
  }

  view.on('init', function (next) {
    let q = keystone.list('Room').model.findOne({
      slug: locals.filters.room
    })

    q.exec(function (err, result) {
      locals.data.room = result
      next(err)
    })
  })


  view.render('room')
}