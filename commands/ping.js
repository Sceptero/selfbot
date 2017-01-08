// measure the ping to server | .ping
"use strict";

module.exports = {
    trigger: "ping",
    action: function (bot, msg, args) {
        msg.delete();
        msg.channel.sendMessage("Ping?")
            .then(message => {
                message.edit(`Pong! (took: ${message.createdTimestamp - msg.createdTimestamp}ms)`);
            });
    }
};