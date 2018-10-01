var keystone = require('keystone')
var Types = keystone.Field.Types

var Info = new keystone.List('Info', {
})

Info.add({
  phone1: { type: String },
  phone2: { type: String },
  email: {type: String},
  instagram: { type: Types.Url },
  facebook: { type: Types.Url },
  vk: {type: Types.Url},
  logo: { type: Types.CloudinaryImage },
  address: { type: Types.Html, wysiwyg: true}
})

Info.register()
