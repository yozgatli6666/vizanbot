const discord = require('discord.js');
exports.run = async(client, message, args) => {
  const embed = new discord.MessageEmbed()
  .setColor("BLUE")
.setDescription(`${client.commands.size} komutum var!`) 
  message.inlineReply(embed);
};
exports.conf = {
enabled: true, 
guildOnly: false,
aliases: ['commands'],
permLevel: 0
};
exports.help = {
    name : "commands"
    };