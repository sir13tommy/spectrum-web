var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var GalleryImage = new keystone.List('GalleryImage', {
	autokey: { from: 'name', path: 'key', unique: true },
});

GalleryImage.add({
  name: { type: String, required: true },
  alt: {type: String},
  description: {type: Types.Html, wysiwyg: true},
	previewImage: { type: Types.CloudinaryImage },
	image: { type: Types.CloudinaryImage },
	publishedDate: { type: Date, default: Date.now },
});

GalleryImage.register();
