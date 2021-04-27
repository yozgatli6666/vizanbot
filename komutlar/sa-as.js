const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  
  
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':x:Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!')
  if (!args[0]) return message.channel.send(':x: **Sa-as yazısını açmak için `sa-as aç veya kapat`**')
  
  if (args[0] == 'aç') {
    db.set(`saas_${message.guild.id}`, 'açık')  
    const unlock = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`:white_check_mark: **Başarıyla \`sa-as Sistemini\` Açtınız, Artık Bot \`sa\` Yazıldığında Cevap Verecek.**`)
    message.channel.send(unlock);
  }
  if (args[0] == 'kapat') {
    db.set(`saas_${message.guild.id}`, 'kapali')
    const unlock = new Discord.MessageEmbed()
    .setColor("BLUE")
      .setDescription(`:white_check_mark: **Başarıyla \`sa-as Sistemini\` Kapattınız, Artık Bot \`sa\` Yazıldığında Cevap Vermeyecek.**`)
    message.channel.send(unlock);
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'sa-as',
  description: 'Selamün aleyküm, Aleyküm selam',
  usage: '!sa-as'
};