const discord = require('discord.js');
exports.run = async(client, message, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle('Davet Sistemi')
    .setColor("BLUE")
    .addField('v!davet-kanal', 'Davet Kanalını Ayarlarsınız', true)
    .addField('v!davetlerim', 'Davetlerinize Bakarsınız', true)
message.channel.send(embed)
};
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ['davet-sistemi']



};
exports.help = {
name: "davet-sistemi"
};