var Response = function (client, message) {
    this.message = message;
    this.client = client;

    if (message.command == 'PRIVMSG') {
        if (message.args[0][0] == '#') this.channel = message.args[0];
        else this.channel = message.nick;
    }

    this.say = function (chan, what) {
        if (!what) {
            if (!this.channel) {
                throw new Error('Could not determine originating channel and no channel specified');
            }
            else {
                what = chan;
                chan = this.channel;
            }
        }
        client.say(chan, what);
    };

    return this;
};

module.exports = Response;
