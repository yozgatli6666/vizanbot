const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fetch = require("node-fetch");
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
require("./inlineReply")
const PREFIX = "v!";


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "yeniden bağlandım kral");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//---------------------//
client.on("roleCreate", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Rol`, role.name)
      .addField(`Sonuç`, `Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor("BLACK")
      .addField(`Rolu Açan`, entry.executor.tag)
      .addField(`Açılan Rol`, role.name)
      .addField(`Sonuç`, `Açılan Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  }
});


////////////CAPS ENGEL//////////////
client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

////////////////////////CAPS ENGEL SON

///////////////////////sa as

client.on("message", async (msg, member, guild) => {
    let i = await db.fetch(`saas_${msg.guild.id}`);
    if (i === "açık") {
      if (msg.content.toLowerCase() === "sa") {
        msg.inlineReply("**Aleyküm Selam Hoşgeldin. Nasılsın?**");
      }
    }
  });


client.on("message", async (msg, member, guild) => {
    let i = await db.fetch(`saas_${msg.guild.id}`);
    if (i === "açık") {
      if (msg.content.toLowerCase() === "iyiyim") {
        msg.inlineReply("**O Zaman Süper!**");
      }
    }
  });
//////////////////sa as son

//////////etiket preefix
client.on('message', async msg => {
  let prefix = ayarlar.prefix 
const embed = new Discord.MessageEmbed()
.setAuthor(`Merhaba Ben Vizan BOT. Sanırım Benden Bahsettin.`)
.setDescription('**Prefixim** **v!**')
.setColor('RANDOM')
  if(msg.content == `<@!820313693123903498>`) return msg.channel.send(embed); //botunuzun idsi
});
/////////////////etiket prefix son

///////////////////otorol

client.on("guildMemberAdd", async member => {

  let kanal = await db.fetch(`otorolkanal_${member.guild.id}`);
  let rol = await db.fetch(`otorolrol_${member.guild.id}`);

  if (!kanal) return;
  if (!rol) return;

  let user = client.users.cache.get(member.id);

  client.channels.cache.get(kanal).send(
  new Discord.MessageEmbed()
  .setColor("BLUE")
  .setTitle(`${client.user.username} | **Oto Rol Sistemi**`)
  .setTimestamp()
  .setThumbnail(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
  .setDescription(`Sunucuya Hoşgeldin **${member}** **${rol} adlı rolun verıldı (${member.user.tag})`))
  
  member.roles.add(rol)
});

/////////////////////////otorol son

/////////////davet sistemi

const guildInvites = new Map();
  const config = require('./config.js');
  client.on("inviteCreate", async invite =>
    guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
  );
  client.on("ready", () => {
    client.guilds.cache.forEach(guild => {
      guild
        .fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));
    });
  });
  
  client.on("guildMemberAdd", async member => {
    const catchedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
    const usedInvite = newInvites.find(
      inv => catchedInvites.get(inv.code).uses < inv.uses
    );
    
    
    if(!usedInvite) {
      let iri = config.unkown.split("[user]")
      .join(client.users.cache.get(member.id))
      .split("[inviter]")
      .join(client.users.cache.get(usedInvite.inviter.id))
      .split("[invites]")
      .join(db.get(`invites.${member.guild.id}.${usedInvite.inviter.id}.invites`))
      .split("[total]")
      .join(db.get(`invites.${member.guild.id}.${usedInvite.inviter.id}.regular`))
      .split("[leaves]")
      .join(db.get(`invites.${member.guild.id}.${usedInvite.inviter.id}.leaves`))
      .split("[jointimes]")
      .join(db.get(`invites.${member.guild.id}.${usedInvite.inviter.id}.joins`))
       member.guild.channels.cache.get(join).send(iri)
    
    let user = db.get(`invites.${member.guild.id}.${member.id}`)
    if(!user) {
    let data = { 
      invites: 0,
      regular: 0,
      leaves: 0,
      joins: 0,
      by: client.users.cache.get(usedInvite.inviter.id).username,
      bouns: 0   
    }
    db.set(`invites.${member.guild.id}.${member.id}`, data)
 }
    }
    if(!usedInvite) return;
    db.add(`invites.${member.guild.id}.${member.id}.joins`, 1)
    let invites = db.get(`invites.${member.guild.id}.${usedInvite.inviter.id}`)
    if(!invites) {
 let brr = { 
        invites: 0,
        regular: 0,
        leaves: 0,
        joins: 0,
        by: client.users.cache.get(usedInvite.inviter.id).username,
        bouns: 0   
      }
      db.set(`invites.${member.guild.id}.${usedInvite.inviter.id}`, brr)
    }
    db.set(`author.${member.guild.id}.${member.id}`, usedInvite.inviter.id);  
    db.add(`invites.${member.guild.id}.${usedInvite.inviter.id}.invites`, 1)

    db.add(`invites.${member.guild.id}.${usedInvite.inviter.id}.regular`, 1)
    
    let join = db.get(`davetlog.${member.guild.id}`)
    let customize = db.get(`join.message.${member.guild.id}`)
    if(!customize) customize = config.join
    if(!join) return;
    let irilian = customize
    .split("[user]")
    .join(client.users.cache.get(member.id).username)
    .split("[inviter]")
    .join(client.users.cache.get(usedInvite.inviter.id))
    .split("[invites]")
    .join(db.get(`invites.${member.guild.id}.${usedInvite.inviter.id}.invites`))
    .split("[total]")
    .join(db.get(`invites.${member.guild.id}.${usedInvite.inviter.id}.regular`))
.split("[leaves]")
    .join(db.get(`invites.${member.guild.id}.${usedInvite.inviter.id}.regular`))
    .split("[jointimes]")
    .join(db.get(`invites.${member.guild.id}.${usedInvite.inviter.id}.joins`))

     member.guild.channels.cache.get(join).send(irilian)
 } catch (err) {
  console.log()
  }
  })
  client.on("guildMemberRemove", member => {
    try {
  let user = db.get(`author.${member.guild.id}_${member.id}`)
  if(!user) {
   let channel = db.get(`davetlog.${member.guild.id}`)
   if(!channel) return;
   member.guild.channels.cache.get(channel).send(`${member.username} sunucudan ayrıldı, ama ben onu kim davet ettiğini bulamadım!`)
   return
  }

  let channel = db.get(`davetlog.${member.guild.id}`)
  if(!channel) return;
  let leave = db.get(`leave.message.${member.guild.id}`)
  if(!leave) leave = config.leave;
  db.add(`invites.${member.guild.id}.${user}.leaves`, 1)
  db.subtract(`invites.${member.guild.id}.${user}.invites`, 1)
  let iriliann = leave.split("[user]")
  .join(client.users.cache.get(member.id))
  .split("[inviter]")
  .join(client.users.cache.get(user).username)
  .split("[invites]")
  .join(db.get(`invites.${member.guild.id}.${user}.invites`))
  .split("[total]")
  .join(db.get(`invites.${member.guild.id}.${user}.regular`))
.split("[leaves]")
  .join(db.get(`invites.${member.guild.id}.${user}.leaves`))
  .split("[jointimes]")
  .join(db.get(`invites.${member.guild.id}.${user}.joins`))

  member.guild.channels.cache.get(channel).send(iriliann)
 } catch(err) {
      console.log()
    }
  })

///////////davet sistemi son

///////sayaç

client.on('guildMemberAdd', member => {
if(!member.guild) return
let sayaçsayı = db.fetch(`sayaçsayı.${member.guild.id}`) - member.guild.memberCount
let sayaçsayı2 = db.fetch(`sayaçsayı.${member.guild.id}`)
let sayaçkanal = db.fetch(`sayaçkanal.${member.guild.id}`)
if(!sayaçsayı) return
if(!sayaçkanal) return
client.channels.cache.get(sayaçkanal).send(
  new Discord.MessageEmbed()
  .setDescription(`**${member} Geldikten Sonra ${sayaçsayı2} Kişi Olmamıza Son ${sayaçsayı} Kişi Kaldı!**`)
)//Bots For List Yapımı!
})

client.on('guildMemberRemove', member => {
  if(!member.guild) return
  let sayaçsayı = db.fetch(`sayaçsayı.${member.guild.id}`) - member.guild.memberCount
  let sayaçsayı2 = db.fetch(`sayaçsayı.${member.guild.id}`)
  let sayaçkanal = db.fetch(`sayaçkanal.${member.guild.id}`)
  if(!sayaçsayı) return
  if(!sayaçkanal) return
  client.channels.cache.get(sayaçkanal).send(
    new Discord.MessageEmbed()
    .setDescription(`**${member} Gittikten Sonra ${sayaçsayı2} Kişi Olmamıza Son ${sayaçsayı} Kişi Kaldı!**`)
  )
  })//Bots For List Yapımı!

/////sayaç son


//////////////////////////küfür engel

client.on("messageUpdate", msg => {
  const i = db.fetch(`${msg.guild.id}.spoinler`);
  if (i) {
 const devils = [      "oç",      "amk",      "ananı sikiyim",      "piç",      "orospu çocuğu",      "orospu",      "kahbe",      "kahpe",      "ebeni sikim",      "anneni sikeyim",      "göt",      "o.ç",      "annen"    ];
    if (devils.some(devils => msg.content.includes(devils))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply(
              `${msg.author.tag}, **Hey Dostum Bu Sunucuda Küfür Söylemek Yasak!**`
            )
            .then(msg => msg.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
}
  if (!i) return;
});

////////////////////////küfür engel son


/////////////////////reklam engel

client.on("message", msg => {
  if (msg.channel.type === 'dm') return;
  if (!db.has(`reklam_${msg.guild.id}`)) return;
  const reklam = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf.gd",
    ".az",
    ".club",
    ".party",
    "discord.gg"
  ];
  if (reklam.some(word => msg.content.includes(word))) {
    try {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();
        return msg
          .reply(
            "**Bu Sunucuda** `Reklam Engelle`** Aktif Reklam Yapmana İzin Vermem İzin Vermem ? !**"
          )
          .then(msg => msg.delete({timeout: 3000}));
      }
    } catch (err) {
      console.log(err);
    }
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.channel.type === 'dm') return;
  if (!db.has(`reklam_${oldMessage.guild.id}`)) return;
  const reklam = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf.gd",
    ".az",
    ".club",
    ".party",
    "discord.gg"
  ];
  if (reklam.some(word => newMessage.content.includes(word))) {
    try {
      if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
        oldMessage.delete();
        return oldMessage
          .reply(
            "**Bu Sunucuda** `Reklam Engelle`** Aktif Reklam Yapmana İzin Vermem İzin Vermem ? !**"
          )
          .then(msg => msg.delete({timeout: 3000}));
      }
    } catch (err) {
      console.log(err);
    }
  }
});
////////////////////////////reklam engel son


///////////////////////////kanal açıp tanıtma

client.on("guildCreate", guild => {
      const embed = new Discord.MessageEmbed()
      .setDescription('Merhaba Ben Vizan BOT. Beni Sunucuna Eklediğin İçin Teşekkür Ederim. Prefixim: **v!**')
      .setTitle('Vizan BOT')
      .setFooter('blablabla')
    guild.channels.create('Vizan BOT', { reason: 'Burada bota ait bilgiler gösterilmektedir.' }).then(channel => channel.send(embed))
        
       
});

////////////////////////son