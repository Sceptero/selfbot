exports.run = function(bot, msg, args) {
  msg.delete();
  msg.channel.sendMessage("Ping?")
    .then(message => {
      message.edit(`Pong! (took: ${message.createdTimestamp - msg.createdTimestamp}ms)`);
    });
};