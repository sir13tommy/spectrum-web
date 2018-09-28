var keystone = require('keystone')
var Types = keystone.Field.Types

var InfoPage = new keystone.List('InfoPage', {
})

InfoPage.add({
  head: {
    title: { type: String },
    keywords: { type: String },
    description: { type: String }
  },
  sliderImages: { type: Types.CloudinaryImages },
  address: { type: Types.Html, wysiwyg: true}
})

InfoPage.register()
