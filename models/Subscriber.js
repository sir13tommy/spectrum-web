var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Subscribe Model
 * ==========
 */
var Subscriber = new keystone.List('Subscriber');

Subscriber.add({
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
});


/**
 * Registration
 */
Subscriber.defaultColumns = 'email';
Subscriber.register();
