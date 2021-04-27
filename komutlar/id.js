const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let kişi = message.mentions.members.first() || message.author;
  const unlock = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(`**İstediğiniz Kişinin ID Numarası:** *${kişi.id}*`);
  message.channel.send(unlock);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases:['id'],
  permlevel:0
}

exports.help = {
  name : "id",
  description:"Etiketlediğinizin IDsini Bulur",
  usage:"!id"
}