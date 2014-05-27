var zygoat = require('./index.js');
var app = zygoat();
var irc = require('irc');

app.use(function (req, res, next) {
    console.log('a ye hello this am middle shit');
    next();
});

app.use(function (req, res, next) {
    console.log('A SECOND ');
    next();
});

app.cmd('aye', function (req, res) {
    res.say('Yes hello.');
});

app.cmd('aye', function (req, res) {
    res.say('Second handler for the same command!');
});

app.msg('PRIVMSG', function(req, res) {
    res.say('#teste', "someone said something somewhere.");
});

app.msg('PRIVMSG', function(req, res) {
    res.say('#teste', "second handler for the same IRC message shit!");
});

var client = new irc.Client('irc.ishmayeck.net', 'Kote', {
    channels: [
        '#teste'
    ]
});

app.run(client);
