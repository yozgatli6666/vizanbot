const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Yeterli yetki, bulunmamakta!`)
  let capslock = await db.fetch(`capslock_${message.guild.id}`)
  
  if (capslock) {
    db.delete(`capslock_${message.guild.id}`)
    const unlock = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`Capslock engelleme sistemi, kapatıldı!`)
    message.channel.send(unlock);
  }
 
  if (!capslock) {
    db.set(`capslock_${message.guild.id}`, 'acik')
    const unlock = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`Capslock engelleme sistemi, aktif!`)
    message.channel.send(unlock);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['capslock-engel'],
  permLevel: 3 
};

exports.help = {
  name: 'capslock-engelleme',
  category: 'Moderasyon komutları!',
  description: 'Capslock kullanımını engeller.',
  usage: 'capslock-engelleme'
};