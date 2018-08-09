const keystone = require('keystone')
const Types = keystone.Field.Types

const Profile = new keystone.List('Profile', {
  map: {name: 'name'}
})

Profile.add({
  name: {type: String},
  description: {type: Types.Html, wysiwyg: true, height: 300},
  image: {type: Types.CloudinaryImage},
  photos: {type: Types.Relationship, ref: 'GalleryImage', many: true},
  facebook: {type: Types.Url},
  instagram: {type: Types.Url}
})

Profile.register()