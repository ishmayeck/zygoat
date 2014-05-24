var Router = function() {
};
Router.prototype.commands = [];
Router.prototype.messages = [];

Router.prototype.cmd = function(options, fn) {
    if(typeof options == 'string') options = { name: options };

    this.commands[options.name] = { options: options, callback: fn };
    console.log('registered route', 'cmd', options.name);
};

Router.prototype.msg = function(type, fn) {
    this.messages[type] = { callback: fn };
    console.log('registered route', type);
};

Router.prototype.handle = function(req, res, next) {
    // This is a command
    if(req.command == 'PRIVMSG' && req.args[1][0] === '`') { // TODO: configurable cmd prefix
        var name = req.args[1].slice(1);
        var c = this.commands[name];
        c && c.callback(req, res);
    } else {
        if(this.messages[req.command]) {
            this.messages[req.command].callback(req, res);
        }
    }
};

module.exports = Router;
