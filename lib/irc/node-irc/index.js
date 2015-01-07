module.exports = {
    runner: function (client, run) {
        client.on('raw', run);
    }
};
