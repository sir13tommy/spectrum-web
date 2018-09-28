var keystone = require('keystone');
var middleware = require('./middleware');
var subscriber = require('./api/subscriber');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.initConfigs)

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);

	app.get('/rooms', routes.views.rooms)
	app.get('/rooms/:room', routes.views.room)
	// Api
	app.post('/api/subscriber', subscriber);
};
