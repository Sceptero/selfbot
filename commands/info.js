// print embed with info about user | .info username
"use strict";

const RichEmbed = require("discord.js").MessageEmbed;

module.exports = {
    trigger: "info",
    action: function (bot, msg, args) {

        const infoEmbed = new RichEmbed();

        if (args.length == 0) { // server info
            infoEmbed.setColor(0xEEEEEE)
                .setTitle(`SERVER INFO`)
                .setThumbnail(msg.guild.iconURL())
                .addField("▫ OK", 'member.displayName', true)
                .addField("▫Two", "Two Value", true)
                .addField("▫Three", "Three Value", true)
                .addField("▫Four", "Four Value", true);

            msg.edit("", { embed: infoEmbed }).catch((error) => {
                console.log(error);
                msg.delete();
            });
            return;
        }
        
        const userIdMatch = args[0].match(/^<@(\d+)>$/);
        let userPromise;

        if (userIdMatch) {
            userPromise = msg.guild.members.fetch(userIdMatch[1]);
        } else
        {
            userPromise = msg.guild.members.fetch({ query: args[0], limit: 1 });
        }

        userPromise.then( (fetched) => {
            let member;
            if (fetched.size) {
                member = fetched.first();
            } else {
                member = fetched;
            }

            if (member == null) {
                msg.delete();
                return;
            }

            
            infoEmbed.setColor(0xEEEEEE)
                .setTitle(`${member.user.bot ? "BOT" : "USER"} INFO`)
                .setThumbnail(member.user.avatarURL())
                .addField("▫ OK", member.displayName, true)
                .addField("▫Two", "Two Value", true)
                .addField("▫Three", "Three Value", true)
                .addField("▫Four", "Four Value", true);

            msg.edit("", { embed: infoEmbed }).catch((error) => {
                console.log(error);
                msg.delete();
            }).catch(error => {
                console.error(error);
            })
        });
    }
};