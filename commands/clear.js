module.exports = {
    name: 'clear',
    description: "Clear messages!",
    // Remember that the initial !clear counts as a message itself, so !clear 1 will only remove the message -just- typed
    // Messages older than 14 days cannot be bulk deleted

    async  execute(message, args) {
    const role = process.env.MODID;
    if (message.member.roles.cache.has(role)){ 
        if (!args[0]) return message.reply("Please enter the amount of messages to clear!");
 
        if(isNaN(args[0])) return message.reply("Please type a real number!");
 
        if(args[0] > 100) return message.reply("You can't remove more than 100 messages!");
        
        if(args[0] < 1) return message.reply("You have to delete at least one message!");
 
        await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)
    });
    } else {
        message.channel.send('No Dice!');
        console.log('No Dice Sent');
 }
 }
}   