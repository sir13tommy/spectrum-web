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

  let q = keystone.list('Room').model.findOne({
    slug: locals.filters.room
  })

  q.exec().then(function (result) {
    // get room info
    locals.data.room = result
    let galleryQ = keystone.list('GalleryImage').model.find()
      .where('_id').in(result.gallery)
    let roomsQ = keystone.list('Room').model.find()
      .where('_id').in(locals.data.room.rooms)
    let stuffQ = keystone.list('GalleryImage').model.find()
      .where('_id').in(result.stuff)

    return Promise.all([
      galleryQ.exec(),
      roomsQ.exec(),
      stuffQ.exec(),
    ])
  }).then(function(result) {
    let [gallery, rooms, stuff] = result
    locals.data.gallery = gallery
    locals.data.rooms = rooms
    locals.data.stuff = stuff

    view.render('room')
  }).catch(function(err) {
    next(err)
  })
}