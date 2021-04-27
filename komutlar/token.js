const Discord = require('discord.js')
exports.run = function(client, message, args) {
message.channel.send('Tokenimi Sana Özel Mesaj Olarak Attım')
let user = message.author
const botclub = new Discord.MessageEmbed()
.setColor("BLUE")
.setTimestamp()
.setDescription(`**"${user.username}" Buyur Tokenim;**`)
.setImage('https://tenor.com/view/recepivedik-nah-turkish-series-nope-gif-16334864')
 message.author.send(botclub)
  
  
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["token"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'token'
  };