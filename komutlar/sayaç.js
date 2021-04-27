const Discord = require('discord.js')
const db = require('quick.db')


exports.run = (client, message, args) => {
const sayaçsayı = args[1]
const sayaçkanal = message.mentions.channels.first()
if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(
    new Discord.MessageEmbed()
  .setColor("BLUE")
    .setDescription(`**Sunucuyu Yönet Yetkin Yok!**`)
)
if(!sayaçkanal) return message.channel.send(
    new Discord.MessageEmbed()
  .setColor("BLUE")
    .setDescription(`Sayaç Kanalını Belirtmedin`)
)//Bot For List Yapımı!
if(!sayaçsayı) return message.channel.send(
    new Discord.MessageEmbed()
  .setColor("BLUE")
    .setDescription(`Sayaç Sayısını Yazmadın`)
)
if(sayaçsayı == message.guild.memberCount) return message.channel.send(
    new Discord.MessageEmbed() 
  .setColor("BLUE")
    .setDescription(`Sayaç Sayısı Sunucudaki Kişi Sayısı İle Aynı Olamaz`)
)
if(sayaçsayı < message.guild.memberCount) return message.channel.send(
    new Discord.MessageEmbed() 
  .setColor("BLUE")
    .setDescription(`Sayaç Sayısı Sunucudaki Kişi Sayısından Az Olamaz`)
)
message.channel.send(
    new Discord.MessageEmbed()
  .setColor("BLUE")
    .setDescription(`**Sayaç Kanal ${sayaçkanal} Olarak Ayaralandı**\n**Sayaç Sayısı ${sayaçsayı} Olarak Ayarlandı!**`)
)//Bots For List Yapımı!
db.set(`sayaçkanal.${message.guild.id}`, `${sayaçkanal.id}`)
db.set(`sayaçsayı.${message.guild.id}`, `${sayaçsayı}`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}
exports.help = {
    name: "sayaç"
}