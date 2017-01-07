'use strict';
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

bot.config = config;

bot.on('ready', () => {
  console.log(`Simple Selfbot: Ready to spy on ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
  delete bot.user.email;
  delete bot.user.verified;
  console.log("=> Ready");
});

bot.on('message', msg => {
  if(msg.isMentioned(bot.user.id)) {
    console.log(`[MENTION] ${msg.author.username} (${msg.author.id}) on ${msg.guild.name}/${msg.channel.name}:\n${msg.content}`);
  }

  if(msg.author.id !== bot.user.id) return;
  if(!msg.content.startsWith(config.prefix)) return;
  
  const args = msg.content.split(" ");
  const command = args.shift().slice(config.prefix.length);
  
  try {
    let cmdFile = require("./commands/" + command);
    cmdFile.run(bot, msg, args);
  } catch(e) {
    msg.delete();
  }
});

bot.on('error', console.error);
bot.on('warn', console.warn);
bot.on('disconnect', console.warn);

bot.login(config.botToken);
bot.password = config.password;

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  console.error(errorMsg);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});