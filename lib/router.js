var Router = function() {
};
Router.prototype.commands = [];
Router.prototype.messages = [];

Router.prototype.cmd = function(options, fn) {
    if(typeof options == 'string') options = { name: options };

    if(!this.commands[options.name]) this.commands[options.name] = [];
    this.commands[options.name].push({ options: options, callback: fn });
    console.log('registered route', 'cmd', options.name);
};

Router.prototype.msg = function(type, fn) {
    if(!this.messages[type]) this.messages[type] = [];
    this.messages[type].push({ callback: fn });
    console.log('registered route', type);
};

Router.prototype.handle = function(req, res, next) {
    // This is a command
    if(req.command == 'PRIVMSG' && req.text[0] === '`') { // TODO: configurable cmd prefix
        var name = req.text.split(' ')[0].slice(1);
        this.commands[name] && this.commands[name].forEach(function(obj) {
            obj.callback && obj.callback(req, res);
        });
    } else {
        if(this.messages[req.command]) {
            this.messages[req.command] && this.messages[req.command].forEach(function(obj) {
                obj.callback && obj.callback(req, res);
            });
        }
    }
};

module.exports = Router;
