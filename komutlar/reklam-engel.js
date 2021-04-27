const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
 
  if (args[0] == 'aç') {
    if(db.has(`reklam_${message.guild.id}`)) return message.channel.send(`**Zaten Reklam Engel Sistemi Açık**`)
    db.set(`reklam_${message.guild.id}`, 'acik')
      message.channel.send(
new Discord.MessageEmbed()
.setColo("BLUE")
.setDescription(`**Reklam Engel Sistemi Başarıyla Açıldı! (Reklam Engel Üyeleri Yasakla Yetkisi Olanları Engellemez)**`)
)
  }
  if (args[0] == 'kapat') {
        if(!db.has(`reklam_${message.guild.id}`)) return message.channel.send(`**Zaten Reklam Engel Sistemi Kapalı!**`)
    db.delete(`reklam_${message.guild.id}`)
      message.channel.send(
new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`**Reklam Engel Sistemi Başarıyla Kapatıldı!**`)
)
  }
message.channel.send(
new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`**aç yada kapat Yazmalısınız**`)
)
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reklam-engel', 'reklamengel'],
  permLevel: 0
};
 
exports.help = {
  name: 'reklam-engelle',
  description: '[Admin Komutu]',
  usage: 'reklam-engelle'
};