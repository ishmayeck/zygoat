var zygoat = require('./zygoat');
var app = zygoat();
var irc = require('irc');

//app.use(function (req, res, next) {
//    console.log('a ye hello this am middle shit');
//    next();
//});
//
//app.use(function (req, res, next) {
//    console.log('A SECOND ');
//    next();
//});

app.cmd('aye', function (req, res) {
    res.say('Yes hello.');
});

app.cmd('time', function (req, res) {
    res.say('the time is now ' + new Date().toLocaleString());
});

var client = new irc.Client('irc.ishmayeck.net', 'Kote', {
    channels: [
        '#teste'
    ]
});

app.run(client);
