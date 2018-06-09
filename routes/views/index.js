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
			locals.data.config = result
		})
		.then(() => {
			var roomsQ = keystone.list('Room').model.find({})
			var servicesQ = keystone.list('GalleryImage').model.find({})
			var partnersQ = keystone.list('Partner').model.find({})
			return Promise.all([
				roomsQ.exec(),
				servicesQ.exec(),
				partnersQ.exec()
			])
		})
		.then((rooms, services, partners) => {
			console.log(rooms, services, partners)
		})
		.catch((err) => {
			console.log(err)
		})

	// Render the view
	view.render('index');
};
