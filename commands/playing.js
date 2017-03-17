// set status | .playing status_msg
// NOT WERKING YET
"use strict";

module.exports = {
    trigger: "playing",
    action: function (bot, msg, args) {
        bot.user.setGame("the test");
        msg.delete();
    }
};