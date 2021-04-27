const Discord = require('discord.js')
exports.run = (client, message, args) => {

const gamerwolf = new Discord.MessageEmbed()
.setColor("BLUE")

.setThumbnail('https://cdn.discordapp.com/avatars/804463985188929546/eca5be2fc91cdfc31126f832320dd511.png')

.addField("Davet Linkim",` [0 Perm](https://discord.com/oauth2/authorize?client_id=820313693123903498&scope=bot&permissions=0) \n[8 Perm](https://discord.com/oauth2/authorize?client_id=820313693123903498&scope=bot&permissions=8) `)
    
.addField("Destek Sunucuma Katıl",` [Destek Sunucum](https://discord.gg/7Rh4tXkJbW)`)

message.channel.send(gamerwolf)
    
    
    }
    exports.conf = {
        aliases: ["invite","invites"],
        permLevel: 0
          
        };
          
        exports.help = {
        name: 'davet'
        };