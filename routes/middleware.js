var _ = require('lodash');
var keystone = require('keystone')


/**
	Initialises the standard view locals
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Главная', key: 'home', href: '/' },
		{ label: 'Локации', key: 'rooms', href: '/rooms' },
		{ label: 'Расписане', key: 'booking', href: '/booking' },
		{ label: 'Партнеры', key: 'partners', href: '/partners' },
		{ label: 'Реквизит', key: 'stuff', href: '/stuff'},
		{ label: 'Инфо', key: 'info', href: '/info'}
	];
	res.locals.user = req.user;
	next();
};

exports.initConfigs = function (req, res, next) {
	let query = keystone.list('SiteConfig').model.find();
	query.exec().then((result, err) => {
		if (err) {
			console.log(err)
		}
		if (result.length) {
			res.locals.data.siteConfigs = result[0]
		}
		next()
	})
}


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
