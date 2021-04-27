const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (args[0] === "aç") {
    db.set(`${message.guild.id}.spoinler`, true);
    message.channel.send(
      "**Küfür Engel Sistemi Başarılı Şekilde** `Aktif` **Edildi.** **Bot ban yetkisi Olanların Mesajını Silmeyecektir.**"
    );
    return;
  }
  if (args[0] === "kapat") {
    db.delete(`${message.guild.id}.spoinler`);
    message.channel.send(
      "**Başarılı Şekilde** `Devre Dışı` **Edildi.**"
    );
    return;
  }
  message.channel.send(
    "**Lütfen** `aç` **yada** `kapat` **Yazın!**"
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfürengel", "küfür-engel", "küfür"],
  permLevel: 0
};

exports.help = {
  name: "küfür-engel",
  description: "",
  usage: ""
};