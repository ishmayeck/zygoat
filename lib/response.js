var Response = function(client, message) {
    this.client = client;

    if(message.command == 'PRIVMSG') {
        this.channel = message.args[0];
    }

    this.say = function(chan, what) {
        if(!what) {
            if(!this.channel) {
                throw new Error('Could not determine originating channel and no channel specified');
            } else {
                what = chan;
                chan = this.channel;
            }
        }
        client.say(chan, what);
    };

    return this;
};

module.exports = Response;
