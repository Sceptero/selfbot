// Application entry-point
"use strict";

const Discord = require("discord.js");

const MessagesHandler = require("./modules/MessagesHandler");


class App {
    constructor() {
        this.bot = new Discord.Client();
        this.bot.config = this.loadConfig();
        this.startLogging();

        this.messagesHandler = new MessagesHandler(this.bot);

        this.bot.login(this.bot.config.token);
        this.bot.password = this.bot.config.password;
    }

    loadConfig() {
        let config;
        try {
            config = require("./config.json");
            return config;
        } catch (error) {
            console.error("Couldn't load config.json");
            process.exit(1);
        }
    }

    startLogging() {
        this.bot.on("ready", () => {
            console.log(`Simple Selfbot: Ready to spy on ${this.bot.users.size} users, in ${this.bot.channels.size} channels of ${this.bot.guilds.size} servers.`);
            delete this.bot.user.email;
            delete this.bot.user.verified;
        });

        this.bot.on("error", console.error);
        this.bot.on("warn", console.warn);
        this.bot.on("disconnect", console.warn);
        process.on("uncaughtException", console.error);
        process.on("unhandledRejection", console.error);
    }
}

let app = new App();