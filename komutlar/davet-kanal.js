const Discord = require('discord.js'); //bu bir modül modüllerin ne işe yaradığını öğrenmek için 'Modül Yükleme' klasörüne
const irilians = require('quick.db');

exports.run = (client, message) => {
var yetki = "Yönetici yetkisine sahip olmalısın."
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Maalesef Yetkin Yok.\n${yetki}`)
var developed = "Developed by YOZG4TLI#5749"
let channel = message.mentions.channels.first()
if(!channel) return message.channel.send(`Lütfen bir kanal etiketleyin.\n${developed}`)
irilians.set(`davetlog.${message.guild.id}`, channel.id)
message.channel.send("Ayarlandı.")

};

exports.conf = {
  enabled: true, //komutun açık kapalı olduğunu gösterir | true = açık false = kapalı
  guildOnly: true, //komutu herkes kullanabiliyormu onu gösterir
  aliases: ['davet-log', '2'], //komutun farklı kullanımları
  permLevel: 0 //kimler kullancağını belirtir 
};

exports.help = {
  name: 'davet-kanal', //adını belirtin (kullanmak için gereken komut) Örneğin otorol NOT Hangi ismi yazarsanız komut o isimle çalışır
  description: 'davet kanalını ayarlar', //komutun açıklaması
  usage: 'davet-kanal' //komutun kullanım şekli (örneğin !otorol <@rol> <#kanal>)
};




