const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  
  
  if (prefix == null) prefix = "v!";
  

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
       
        `•| \`${prefix}otorol-kapat\` Kullanabilmek için , \`Yönetici\` **Yetkisine sahip olmanız gerekir**.`
      );

    message.channel.send(embed);
    return;
  }
const sistem = await db.fetch(`otorolrol_${message.guild.id}`);
if(!sistem) return message.channel.send(
  new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(`**Otorol Sistemi Aktif Olmadığı İçin __Kapatılamadı__**`));
db.delete(`otorolrol_${message.guild.id}`);
db.delete(`otorolkanal_${message.guild.id}`);
const embedi =  new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(`**Otorol Sistemi Başarıyla __Kapatıldı__**`);
  return message.channel.send(embedi);
}
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otorol-kapat"],
  permLevel: 0
};

exports.help = {
  name: "otorol-kapat",
  description: "",
  usage: "otorol-kapat"
};