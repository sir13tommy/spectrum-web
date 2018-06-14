var keystone = require('keystone')
var Types = keystone.Field.Types

var Partner = new keystone.List('Partner', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
})

Partner.add({
  title: { type: String, required: true },
  logo: { type: Types.CloudinaryImage },
  url: { type: Types.Url }
})

Partner.register()