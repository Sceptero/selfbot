// print embed with info about user | .info username
"use strict";

const RichEmbed = require("discord.js").RichEmbed;

module.exports = {
    trigger: "info",
    action: function (bot, msg, args) {

        let username = args[0];

        msg.guild.fetchMembers().then((guild) => {
            let guildMember = guild.members.find((m) => {
                return m.displayName.toLowerCase().startsWith(username.toLowerCase());
            });

            if (guildMember == null) {
                msg.delete();
                return;
            }

            let infoEmbed = new RichEmbed()
                .setColor(0xEEEEEE)
                .setTitle(`${guildMember.user.bot ? "BOT" : "USER"} INFO`)
                .setThumbnail(guildMember.user.avatarURL)
                .addField("▫ OK", guildMember.displayName, true)
                .addField("▫Two", "Two Value", true)
                .addField("▫Three", "Three Value", true)
                .addField("▫Four", "Four Value", true);

            msg.edit("", { embed: infoEmbed }).catch((error) => {
                console.log(error);
                msg.delete();
            })
        });
    }
};