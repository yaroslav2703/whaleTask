const auth = require('../../middleware/auth.middleware');


module.exports = (app) => {
    app.post('/signup', require('./authSignUp'));
    app.post('/signin', require('./authSignIn'));

    app.get('/info', auth, require('./authInfo'));
    app.get('/latency', auth, require('./authLatency'));
    app.get('/logout', auth, require('./authLogout'));
};