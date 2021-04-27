const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    const yetkihata = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription('`Yetersiz Yetki!`')
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(yetkihata)

let channel = message.mentions.channels.first() || message.channel;

const uyg = new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription("Uygulanıyor...")
 message.channel.send(uyg);
  
  const nuke = new Discord.MessageEmbed()
    .setAuthor(`Nuke Işlemi Başarılı ✅`)
    .setColor('BLUE')
    .setImage('https://tenor.com/view/explosion-boom-explode-gif-17383346')
    .setTimestamp()
    let position = channel.position;
    setTimeout(() => {
    channel.delete();
    channel.clone().then(msg => {
    msg.setPosition(position);
    msg.send(nuke);
});
}, 280)


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'nuke'
};