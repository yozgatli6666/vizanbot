const Discord = require("discord.js")

exports.run = (client, message, args) => {
  
  let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
 message.channel.createOverwrite(everyone, {
    SEND_MESSAGES: null
  });
  const unlock = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setDescription(':white_check_mark: Kanal Açıldı')
  message.channel.send(unlock);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["aç"]
};

exports.help = {
  name: "sohbet-aç",
  description: "Sohbet kanalini acar",
  usage: "kapat"
};