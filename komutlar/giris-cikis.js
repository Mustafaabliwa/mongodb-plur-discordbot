const Discord = require('discord.js');
const giriscikis = require('../modules/giriş-çıkış.js')

exports.run = (client,message, args) => {
    let kanal = message.mentions.channels.first()

    const data = new giriscikis({
        sunucu: message.guild.id,
        kanal: kanal.id
    })
    data.save().catch(console.log)
    message.channel.send(`Giriş Çıkış kanalı ${kanal} olarak ayarlanmıştır.`)
};
    exports.conf = {
        aliases: [],
        permLevel: 0,
      };
      exports.help = {
        name: 'giriş-çıkış',
         description: 'daha sonra yazılcak.',
        usage: 'daha sonra yazıclak.'
      };