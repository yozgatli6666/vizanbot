const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json")
const db = require('quick.db')

exports.run = async(client, message, args) => {

let prefix = "v!" //prefixinizi girin

if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed() .setColor("BLUE") .setDescription("**Bu Komutu Kullanabilmek İçin \`Mesajları Yönet\` Yetkisine Sahip Olmalısın !**").setColor("RANDOM"))

    let sil = args[0]
    if(!sil) {
const embed = new Discord.MessageEmbed()
  .setDescription(`**Bir sayı belirtmelisin ! Örnek; ${prefix}sil 10**`)
  .setColor("BLUE")
        message.channel.send(embed)
    }

    message.channel.bulkDelete(sil).then(() => {
const channel = new Discord.MessageEmbed()
    .setDescription(`**Başarıyla ${sil} Mesaj ${message.author} Tarafından Silindi!**`)
    .setColor("BLUE")
        message.channel.send(channel).then(m => m.delete({ timeout: 8000 }));
    })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['temizle'],
    permlvl: 0
}

exports.help = {
    name: "sil"
}