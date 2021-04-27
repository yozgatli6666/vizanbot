const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

let p = db.fetch(`prefix_${message.guild.id}`)
let prefix = ayarlar.prefix;
if (p) prefix = p;
  
let pages = [
  `**Vizan BOT Yardım Menüsü** \n> Merhaba. Ben Vizan BOT. Yardım Menüme Hoşgeldin. Biraz Değişik Olabilir Ama Korkma Alışırsın. Aşağıdaki Butonlar İle Diğer Menülerime Geçebilirsin. İyi Eğlenceler.`,
  `
 **MODERASYON KOMUTLARI**
 <:vizan1:832601358855176237> **${prefix}ban**
*Etiketlediğiniz Kullanıcıyı Sunucudan Yasaklarsınız.*

 <:vizan1:832601358855176237> **${prefix}kick**
 *Etiketlediğiniz Kullanıcıyı Sunucudan Atarsınız.*
 
 <:vizan1:832601358855176237> **${prefix}mute**
 *Etiketlediğiniz Kişiye Süreli Mute Atarsınız.*
  
 <:vizan1:832601358855176237> **${prefix}sil**
 *Belirttiğiniz Miktarda Mesajı Siler.*
  
 <:vizan1:832601358855176237> **${prefix}aç**
 *Sohbet Kanalını @everyone'ye açar.*

 <:vizan1:832601358855176237> **${prefix}kapat**
 *Sohbet Kanalını @everyone'ye kapatır.*

 <:vizan1:832601358855176237> **${prefix}nuke**
 *Sohbet Kanalını Temizler.*
 
 <:vizan1:832601358855176237> **${prefix}herkese-rol-ver**
 *Herkese Etiketlediğiniz Rolü Verir.*
 
 <:vizan1:832601358855176237> **${prefix}herkesten-rol-al**
 *Herkesten Etiketlediğiniz Rolü Alır.*`,

  ` **YETKİLİ KOMUTLARI**
 <:vizan1:832601358855176237> **${prefix}otorol**
 *Otorolü Ayarlar.*
 
 <:vizan1:832601358855176237> **${prefix}davet-sistemi**
 *Davet Sistemine Bakarsınız.*
 
 <:vizan1:832601358855176237> **${prefix}sayaç**
 *Sayaçı Ayarlarsınız.*
  
 <:vizan1:832601358855176237> **${prefix}yaz**
 *Bota Yazdırmak İstediğiniz Yazıyı Yazdırırsınız.* 
  
 <:vizan1:832601358855176237> **${prefix}sa-as**
 *Sa-As Sistemini Açar Ya Da Kapatırsınız*
 
 <:vizan1:832601358855176237> **${prefix}küfür-engel**
 *Küfür Engeli Açar Ya Da Kapatırsınız.*
 
 <:vizan1:832601358855176237> **${prefix}reklam-engel**
 *Reklam Engeli Açar Ya Da Kapatırsınız.*`,

  `**KULLANICI KOMUTLARI**
<:vizan1:832601358855176237> **${prefix}id**
*Etiketlediğiniz Kişinin Ya Da Kendi Kullanıcı ID'nize Bakarsınız.*

<:vizan1:832601358855176237> **${prefix}havadurumu**
*İstediğiniz Yerin Havadurumuna Bakarsınız.*

<:vizan1:832601358855176237> **${prefix}çeviri**
*Belirttiğiniz Kelimenin Türkçesine Ya Da İnglizce'sine Bakarsınız.*

<:vizan1:832601358855176237> **${prefix}konuş**
*Ses Kanalına Girerek Botu Konuşturursunuz.*

<:vizan1:832601358855176237> **${prefix}korona**
*Dünya Ve Ülke Genelindeki Korona Durumuna Bakarsınız.*

<:vizan1:832601358855176237> **${prefix}davet**
*Botun Davet Linkine Bakarsınız.*`,
]
let page = 1 

const embed = new Discord.MessageEmbed() // Define a new embed
.setColor("BLUE") // Set the color
.setFooter(`Vizan BOT |  ${page} / ${pages.length}`)
.setDescription(pages[page-1])
.setTitle(`

      `)


message.inlineReply({embed}).then(msg => {
  msg.react('⬅️').then( r => {
    msg.react('➡️')

    // Filters
    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id
    const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id

    const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000})
    const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000})

    backwards.on('collect', (r, u) => {
        if (page === 1) return r.users.remove(r.users.cache.filter(u => u !== client.user).first())
        page--
        embed.setDescription(pages[page-1])
        embed.setFooter(`Vizan BOT |   ${page} / ${pages.length}`)
        msg.edit(embed)
        r.users.remove(r.users.cache.filter(u => u !== client.user).first())
        //r.users.remove(r.users.cache.filter(u => u !== client.user))
    })

    forwards.on('collect', (r, u) => {
        if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u !== client.user).first())
        page++
        embed.setDescription(pages[page-1])
        embed.setFooter(`Vizan BOT |  ${page} / ${pages.length}`)
        msg.edit(embed)
        r.users.remove(r.users.cache.filter(u => u !== client.user).first())
    })
  })
})
};
    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["yardım"],
        permLevel: 0
      };
      
      exports.help = {
        name: "yardım",
        description: "Sayfalı yardım menüsü qardes",
        usage: "Sayfalı yardım Menüsü"
      };