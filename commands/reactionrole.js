module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
        async execute (message, args, Discord, client) {
        
        //Variable which determines output channel. Do I really need this?
        //Live Channel
        const channel = process.env.JOINCHANNEL
        //Test Channel
        // const channel = process.env.TESTCHANNEL;

        //Begin React Code
        const role = process.env.LAVEID; 
        const yellowTeamRole = message.guild.roles.cache.find(role => role.name === "🧡 Member");
        const blueTeamRole = message.guild.roles.cache.find(role => role.name === "💙 Notifications");
 
        const yellowTeamEmoji = '🧡';
        const blueTeamEmoji = '💙';
        if (message.member.roles.cache.has(role)){ 
        let embed = new Discord.MessageEmbed()
            //.setColor('#e42643')
            .setColor('#ff6002')
            .setTitle('Sound Easy? I think so too!')
            .setDescription('Click the Hearts for the following actions!\n\n'
                + `${yellowTeamEmoji} to agree to the rules\n`
                + `${blueTeamEmoji} to receive notifications`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(yellowTeamEmoji);
        messageEmbed.react(blueTeamEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
                }
                if (reaction.emoji.name === blueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeamRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeamRole);
                }
                if (reaction.emoji.name === blueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueTeamRole);
                }
            } else {
                return;
            }
        });
    } else {
       message.channel.send('No Dice!');
       console.log('No Dice Reply Sent');
    }
 
}   
}