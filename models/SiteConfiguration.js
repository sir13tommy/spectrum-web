var keystone = require('keystone')
var Types = keystone.Field.Types

var SiteConfig = new keystone.List('SiteConfig', {
})

SiteConfig.add({
  phone1: { type: String },
  phone2: { type: String },
  instagram: { type: Types.Url },
  facebook: { type: Types.Url },
  logo: { type: Types.CloudinaryImage },
  address: { type: Types.Html, wysiwyg: true}
})

SiteConfig.register()
