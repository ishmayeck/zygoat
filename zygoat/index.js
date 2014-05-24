var Router = require('./router.js');
var Response = require('./response.js');

var App = function() {
    this.router = new Router();
    var self = this;
    this.use(function() {
        self.router.handle.apply(self.router, arguments)
    });
};

App.prototype.middleware = [];

/**
 * Add a middleware to the stack
 * @param fn {Function} Middleware function
 */
App.prototype.use = function(fn) {
    console.log('using middleware: ', arguments);
    this.middleware.push(fn);
};

App.prototype.run = function(client) {
    /**
     * Create a req/res pair and dispatch it
     * Should these be called something other than req/res maybe? eh?
     */
    client.addListener('error', function(e) {
        console.log('ERROOORRRRR', e);
    });
    client.on('raw', function(message) {
        var res = new Response(client, message);
        App.prototype.dispatch(message, res);
    });
};

App.prototype.dispatch = function(req, res, index) {
    if(!index) index = 0;
    if(index > this.middleware.length - 1) return;
    console.log('executing middleware #', index, 'for message', req.rawCommand);

    var self = this;
    this.middleware[index](req, res, function(err) {
        if(!err) self.dispatch(req, res, index + 1);
    });
};

App.prototype.cmd = function() {
    this.router.cmd.apply(this.router, arguments);
};

App.prototype.msg = function() {
    this.router.msg.apply(this.router, arguments);
};

module.exports = function() {
    return new App();
};

