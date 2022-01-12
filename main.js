//written by Lavelain with HUGE inspiration from CodeLyon, CubWorld, jo_h47

//set constants and require dotenv for variable encryptions
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

//prefix should be !, but can be changed via the .env
const prefix = process.env.PREFIX;
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
//Get commands dynamically per file name, once added to /commands/ folder
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
//Log entry for when the Bot has been successfully initialized  
client.on('ready', () => {
    console.log('Domo_AriBOTo is online!');
    //how the fuck do you add timestamps?
});

//Auto-Join Assign Role & Message (Remarked out because this will be OPT-IN using Emojis/Reactions now)
//const joinrole = process.env.JOINROLE
//const joinchannel = process.env.JOINCHANNEL
//client.on('guildMemberAdd', guildMember =>{
//    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === joinrole);
// 
//    guildMember.roles.add(welcomeRole);
//    guildMember.guild.channels.cache.get(joinchannel).send(`Welcome <@${guildMember.user.id}> to our server! Make sure to check out the rules channel!`)
//});

//Begin actual !command code, pairs with the dynamic directory file names
client.on('message', message => {
 
    if (!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client);
    } else if (command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }}
    
);
 
//encoded Discord Developer Bot Token
client.login(process.env.DISCORD_TOKEN);