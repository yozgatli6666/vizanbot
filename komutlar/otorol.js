const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");


exports.run = async (client, message, args) => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  
  
  
  if (prefix == null) prefix = "v!";
  
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(

          `•| \`${prefix}otorol\` Kullanabilmek için , \`Yönetici\` **Yetkisine sahip olmanız gerekir**.`
        )

    );
  let rol = message.mentions.roles.first();
  let kanal = message.mentions.channels.first();

  if (!rol) {
    const embed2 = new Discord.MessageEmbed()

      .setDescription(
        `Lütfen Bir __Rol__ Etiketle \nÖrnek Kullanım : **${prefix}otorol @rol #kanal**`
      )
      .setColor("BLUE");

    return message.channel.send(embed2);
  }

  if (!kanal) {
    const embed3 = new Discord.MessageEmbed()

      .setDescription(
        `Lütfen Bir __Kanal__ Etiketle \nÖrnek Kullanım : **${prefix}otorol @rol #kanal**`
      )
      .setColor("BLUE");

    return message.channel.send(embed3);
  }
  db.set(`otorolrol_${message.guild.id}`, rol.id);
  db.set(`otorolkanal_${message.guild.id}`, kanal.id);

  const embed = new Discord.MessageEmbed()

    .setColor("BLUE")
    .setDescription(
      `Otorol Rolü <@&${rol.id}> (@${rol.name}) Olarak, Bildirimin Gideceği Kanal İse <#${kanal.id}> (#${kanal.name}) Olarak Ayarlandı \n\`Not\`: **Botun Rolü En Üstte Olmaz İse Rol __Vermez__**`
    );

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otorol-aç"],
  permLevel: 0
};

exports.help = {
  name: "otorol",
  description: "",
  usage: "otorol"
};