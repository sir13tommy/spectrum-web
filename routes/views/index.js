var keystone = require('keystone');
var {default: Instagram} = require('node-instagram')
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res)
	var locals = res.locals
	
	let {INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, INSTAGRAM_ACCESS_TOKEN} = process.env
	var instagramClient = new Instagram({
		clientId: INSTAGRAM_CLIENT_ID,
		clientSecret: INSTAGRAM_CLIENT_SECRET,
		accessToken: INSTAGRAM_ACCESS_TOKEN
	})

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home'

	locals.data = {
		rooms: [],
		services: []
	}

	var homePageConfigQ = keystone.list('HomePageConfig').model.find({})

	homePageConfigQ.exec()
		.then((result, err) => {
			if (result.length) {
				locals.data.config = result[0]
			}
		})
		.then(() => {
			let config = locals.data.config

			var roomsQ = keystone.list('Room').model.find()
				.where('_id').in(config.rooms)
			var servicesQ = keystone.list('GalleryImage').model.find()
				.where('_id').in(config.services)
			var partnersQ = keystone.list('Partner').model.find()
				.where('_id').in(config.partners)
			var photographersQ = keystone.list('Profile').model.find()
				.where('_id').in(config.photographers)
			return Promise.all([
				roomsQ.exec(),
				servicesQ.exec(),
				partnersQ.exec(),
				photographersQ.exec()
			])
		})
		.then((result) => {
			let [rooms, services, partners, photographers] = result
			locals.data.rooms = rooms
			locals.data.services = services
			locals.data.partners = partners
			locals.data.photographers = photographers

			services.forEach((service, idx) => {
				service.even = idx % 2 === 0
			})

			photographers.map((profile) => {
				let photosQ = keystone.list('GalleryImage').model.find()
					.where('_id').in(profile.photos)
				photosQ.exec()
					.then((result) => {
						profile.photos = result
					})
			})
		}).then(() => {
			return instagramClient.get('users/self/media/recent')
		}).then(({data}) => {
			locals.data.instagramImages = []
			// separate images in 4th colums
			locals.data.instagramImages.push([], [], [], [])
			if (data && data instanceof Array) {
				data.forEach(({images}, idx) => {
					locals.data.instagramImages[idx % 4].push(images)
				})
			}
		}).then(() => {
			view.render('index');
		})
		.catch((err) => {
			console.log(err)
		})
};
