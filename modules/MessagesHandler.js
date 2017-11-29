// MessagesHandler module, loads commands from folder and handles execution
"use strict";

const fs = require("fs");


module.exports = class MessagesHandler {
    constructor(bot) {
        this.bot = bot;
        this.commands = this.loadCommands();

        this.bot.on("message", this.handleMessage.bind(this));
    }

    loadCommands() {
        let commands = [], command;

        let commandFiles = fs.readdirSync("commands/");

        // load commands from /commands/ directory
        for (let fileName of commandFiles) {
            if (fileName.endsWith('.js')) {
                try {
                    command = require('../commands/' + fileName);
                    if (command == null || command.trigger == null || command.action == null) throw 'error in command module';
                    commands.push(command);
                } catch (error) {
                    console.error('Error occured while loading command from file: ' + fileName);
                }
            }
        }

        return commands;
    }

    handleMessage(msg) {
        if (msg.author.id !== this.bot.user.id) return;
        if (!msg.content.startsWith(this.bot.config.prefix)) return;

        let args = msg.content.split(" ");
        let cmd = args.shift().slice(this.bot.config.prefix.length).toLowerCase();
        let executed = false;

        try {
            for (let command of this.commands)
                if (command.trigger === cmd) {
                    command.action(this.bot, msg, args);
                    executed = true;
                }
            if (!executed) throw "Command not found.";
        } catch (error) {
            console.error(error);
            msg.delete();
        }
    }
}