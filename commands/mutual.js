// console.log mutual servers with other guild members | .mutual
// TODO: Add optional param specifying guild id
"use strict";

module.exports = {
    trigger: "mutual",
    action: function (bot, msg, args) {
        msg.delete();

        console.log(`\nChecking for users with mutual guilds on server: ${msg.guild.name}`)
        msg.channel.members.forEach(x => {
	        if (!x.user.bot && x.id !== msg.author.id) {
		        x.user.fetchProfile().then(y => {
			        if (y.mutualGuilds.array().length > 1) {
				        console.log(` Mutual guilds with ${x.displayName}`);
				        y.mutualGuilds.forEach(z => {
					        if (z.id !== msg.guild.id) console.log(`  ${z.name}`);
				        });
			        }
		        });
            }
        });
    }
};