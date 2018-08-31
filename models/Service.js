const keystone = require('keystone')
const Types = keystone.Field.Types
var Service = new keystone.List('Service', {
  map: {name: 'title'}
})

Service.add({
  title: { type: String },
  image: { type: Types.CloudinaryImage },
  description: { type: Types.Html, wysiwyg: true},
  price: { type: Number },
  free: { type: Boolean}
})
Service.register()
