module.exports = {
    name: 'ping',
    description: "this is the Ping command!",
    execute(message, args){
        const role = process.env.LAVEID;
                
        if (message.member.roles.cache.has(role)){
        message.channel.send('Pong!')
        console.log('Pong reply sent');
        // console.time(' ');
                     
        } else {
            message.channel.send('No Dice!');
            console.log('No Dice Reply Sent');
        }
    }
}