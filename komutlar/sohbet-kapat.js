const Discord = require("discord.js")

exports.run = (client, message, args) => {
  
  let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
 message.channel.createOverwrite(everyone, {
    SEND_MESSAGES: false  ///buraya true Yazarak Sohbet aç komutunu yapabilirsiniz.
  });

  const lock = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(':white_check_mark: Kanal Kapatıldı')
  message.channel.send(lock);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kapat"],
  kategori: "sohbet",
  permLevel: 3
};

exports.help = {
  name: "sohbet-kapat",
  description: "Sohbeti Kapatırsıniz",
  usage: "kapat"
};