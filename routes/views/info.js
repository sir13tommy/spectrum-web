var keystone = require('keystone')

module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  let locals = res.locals

  locals.section = 'info'

  locals.data = {}

  let infoQ = keystone.list('InfoPage').model.find({})

  view.on('init', (next) => {
    infoQ.exec().then((result) => {
      locals.config = result[0]
      next()
    }).catch((err) => {
      next(err)
    })
  })

  view.render('info')
}