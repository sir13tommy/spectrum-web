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

    q.exec().then(function (result) {
      locals.data.room = result
      return keystone.list('GalleryImage').model.find()
        .where('_id').in(result.gallery)
        .exec()
    }).then(function(result) {
      locals.data.gallery = result
      next()
    }).catch(function(err) {
      next(err)
    })
  })

  view.render('room')
}