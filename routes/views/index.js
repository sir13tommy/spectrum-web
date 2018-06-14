var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		rooms: [],
		services: []
	}

	var roomsQ = keystone.list('HomePageConfig').model.find({})
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
			return Promise.all([
				roomsQ.exec(),
				servicesQ.exec(),
				partnersQ.exec()
			])
		})
		.then((result) => {
			let [rooms, services, partners] = result
			locals.data.rooms = rooms
			locals.data.services = services
			locals.data.partners = partners

			services.forEach((service, idx) => {
				if (idx % 2 === 0) {
					service.even = true
				} else {
					service.even = false
				}
			})
		})
		.catch((err) => {
			console.log(err)
		})

	// Render the view
	view.render('index');
};
