var keystone = require('keystone');

exports = module.exports =  function (req, res) {
    let Subscriber = keystone.list('Subscriber').model
    if (req.body && req.body.email) {
        let subscriber = new Subscriber({email: req.body.email})
        subscriber.save(function (err) {
            if (err) {
                res.statusCode = 500
                res.send()
            } else {
                res.statusCode = 200
                res.send()
            }
        })
    } else {
        res.statusCode = 400
        res.send();
    }
}
