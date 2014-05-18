var Response = function(client, message) {
    this.message = message;
    this.client = client;

    if(message.command == 'PRIVMSG') {
        this.say = function(what) {
            client.say(message.args[0], what);
        }
    }
    return this;
};

module.exports = Response;
