var keystone = require('keystone')
var Types = keystone.Field.Types

var HomePageConfig = new keystone.List('HomePageConfig', {
})

HomePageConfig.add({
  phone1: { type: String },
  phone2: { type: String },
  instagram: { type: Types.Url },
  facebook: { type: Types.Url },
  description: { type: Types.Html, wysiwyg: true, height: 300 },
  partners: { type: Types.Relationship, ref: 'Partner', many: true},
  services: { type: Types.Relationship, ref: 'GalleryImage', many: true},
  rooms: { type: Types.Relationship, ref: 'Room', many: true},
  publishedDate: { type: Date, default: Date.now},
  photographers: { type: Types.Relationship, ref: 'Profile', many: true}
})

HomePageConfig.register()
