// embed image | !i image_url ?title
"use strict";

const Discord = require("discord.js");

const ZERO_WIDTH_SPACE = String.fromCharCode(8203);



exports.run = function (bot, msg, args) {
    let richEmbed = new Discord.RichEmbed()
        .setColor(0xFFFFFF)
        .setImage(args[0]);

    if (args[1]) richEmbed.setTitle(args[1]);


    msg.edit("", { embed: richEmbed }).catch((error) => {
        console.log(error);
        msg.delete();
    });

};