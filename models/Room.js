const keystone = require('keystone')
const Types = keystone.Field.Types

const Room = new keystone.List('Room', {
  map: {name: 'title'},
  singular: 'Room',
  plural: 'Rooms',
  autokey: {path: 'slug', from: 'title', unique: true}
})

Room.add({
  title: {type: String, required: true},
  price: {type: Number},
  description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
  },
  services: {type: Types.Html, wysiwyg: true},
  thumbnail: {type: Types.CloudinaryImage},
  bannerImage: {type: Types.CloudinaryImage},
  sliderImages: {type: Types.CloudinaryImages},
  gallery: {type: Types.Relationship, ref: 'GalleryImage', many: true},
  publishDate: {type: Date, default: Date.now}
})

Room.register()