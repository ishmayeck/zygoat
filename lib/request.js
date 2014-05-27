var Request = function(client, message) {
    this.message = message;
    this.rawCommand = message.rawCommand;
    this.command = message.command;
    this.client = client;

    if(this.message.command == 'PRIVMSG') {
        this.channel = this.message.args[0];
        this.text = this.message.args[1];
    }

    return this;
};

module.exports = Request;
