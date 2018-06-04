var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		rooms: []
	}

	var q = keystone.list('Room').model.find({})
	q.exec().then(function(result) {
		locals.data.rooms = result
	})

	// Render the view
	view.render('index');
};
