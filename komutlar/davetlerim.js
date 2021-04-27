const Discord = require('discord.js');
const irilians = require('quick.db');

exports.run = (client, message) => {
var developed = "Developed by ヶ irilianileislamadoğru#1331"
let user = message.mentions.users.first() || message.author;
let invites = irilians.get(`invites.${message.guild.id}.${user.id}`)
const embed = new Discord.MessageEmbed()
    .setAuthor(user.username , user.displayAvatarURL({dynamic:true}))
    .setTitle(`${user.username} Adlı Kullanıcının Davetleri`)
    .setColor("BLUE")
    .setThumbnail(message.author.avatarURL({dynamic:true}))
    .setDescription(`${invites.invites || '0'} toplam davetinden (${invites.regular || '0'} kadardı düzgün ${invites.leaves || '0'} kadarı ayrılan ${invites.bouns || '0'} kadarı bonus)`)
    .setFooter(message.guild.name  , message.guild.iconURL())
    .setTimestamp();
    return message.channel.send(embed)

};

exports.conf = {
  enabled: true, //komut açık kapalı
  guildOnly: true, //herkese kullanır
  aliases: ['davetlerim'], //komutun farklı kullanımları
  permLevel: 0 //kimler kullancağını belirtir 
};

exports.help = {
  name: 'davetlerim', //adını belirtin (kullanmak için gereken komut) Örneğin otorol
  description: 'komutaçıklaması', //komutun açıklaması
  usage: 'davetlerim' //komutun kullanım şekli (örneğin x!otorol <@rol> <#kanal>)
};