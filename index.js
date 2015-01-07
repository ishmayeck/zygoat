var Router = require('./lib/router.js');
var Request = require('./lib/request.js');
var Response = require('./lib/response.js');

var App = function (lib) {
    if (!lib) lib = 'node-irc';
    this.lib = require('./lib/irc/' + lib.toLowerCase());
    this.router = new Router();
};

App.prototype.middleware = [];

App.prototype.colors = require('irc-colors');

/**
 * Add a middleware to the stack
 * @param fn {Function} Middleware function
 */
App.prototype.use = function (fn) {
    console.log('using middleware: ', arguments);
    this.middleware.push(fn);
};

App.prototype.run = function (client) {
    var self = this;

    this.use(function() {
        self.router.handle.apply(self.router, arguments)
    });

    this.lib.runner(client, function (message) {
        var req = new Request(client, message);
        var res = new Response(client, message);

        App.prototype.dispatch(req, res);
    });
};

App.prototype.dispatch = function (req, res, index) {
    if (!index) index = 0;
    if (index > this.middleware.length - 1) return;

    var self = this;
    this.middleware[index](req, res, function (err) {
        if (!err) self.dispatch(req, res, index + 1);
    });
};

App.prototype.cmd = function () {
    this.router.cmd.apply(this.router, arguments);
};

App.prototype.msg = function () {
    this.router.msg.apply(this.router, arguments);
};

module.exports = function (lib) {
    return new App(lib);
};
