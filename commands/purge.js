// purge self messages | !purge ?msg_count=10 | count < 100
"use strict";

module.exports = {
    trigger: "purge",
    action: function (bot, msg, args) {
        let msgCount = parseInt(args[0]) || 10;
        let i = 0;
        if (msgCount > 100) msgCount = 100;

        msg.channel.fetchMessages({ limit: 100 }).then((msgs) => {
            msgs.filterArray((m) => m.author.id === bot.user.id && i++ <= msgCount).forEach(m => m.delete());
            i = 0;
        });
    }
};