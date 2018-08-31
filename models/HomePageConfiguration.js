var keystone = require('keystone')
var Types = keystone.Field.Types

var HomePageConfig = new keystone.List('HomePageConfig', {
})

HomePageConfig.add({
  description: {
    html: {type: Types.Html, wysiwyg: true, height: 300},
    image: { type: Types.CloudinaryImage }
  },
  partners: { type: Types.Relationship, ref: 'Partner', many: true},
  services: { type: Types.Relationship, ref: 'Service', many: true},
  rooms: { type: Types.Relationship, ref: 'Room', many: true},
  sliderImages: { type: Types.CloudinaryImages },
  publishedDate: { type: Date, default: Date.now},
  photographers: { type: Types.Relationship, ref: 'Profile', many: true},
  head: {
    title: { type: String },
    keywords: { type: String },
    description: { type: String }
  }
})

HomePageConfig.register()
