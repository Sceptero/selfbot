// change status | !status type(PLAYING|STREAMING|LISTENING|WATCHING) text ; empty for clearing
"use strict";

const Discord = require("discord.js");

module.exports = {
    trigger: "status",
    action: function (bot, msg, args) {

        if (args.length === 0) {
            bot.user.setActivity('').then( p => console.log(p));
            msg.delete().catch(console.error); 
            return;
        }

        if (args.length < 2 || !['PLAYING', 'WATCHING', 'STREAMING', 'LISTENING'].includes(args[0].toUpperCase())) {
            msg.delete().catch(console.error); 
            return;
        }

        let activityType = args[0].toUpperCase();
        let activityMessage = args.slice(1).join(' ');


        bot.user.setActivity(activityMessage, {type: activityType}).then( p => console.log(p));

        msg.delete().catch(console.error); 
    }
}