var Router = function() {
};

Router.prototype.routes = [];

Router.prototype.add = function(options, fn) {
    if(typeof options == 'string') options = { name: options };

    this.routes[options.name] = { options: options, callback: fn };
    console.log('registered command', options.name);
};

Router.prototype.handle = function(req, res, next) {
    if(req.command == 'PRIVMSG' && req.args[1][0] === '`') { // TODO: configurable cmd prefix
        var name = req.args[1].slice(1);
        var c = this.routes[name];
        console.log(name);
        c && c.callback(req, res);
    }
};

module.exports = Router;
