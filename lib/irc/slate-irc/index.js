var utils;

try {
    utils = require('slate-irc/lib/utils');
} catch (e) {}

module.exports = {
    runner: function (client, run) {
        if (!utils) throw new Error('Please install slate-irc');

        client.on('data', function (data) {
            var message = {
                rawCommand: data.string,
                args: [data.params].concat(data.trailing.split(' ')),
                text: data.trailing,
                command: data.command,
                nick: utils.nick(data)
            };

            run(message);
        })
    }
};
