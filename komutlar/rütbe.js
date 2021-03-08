const Discord = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports.run = async (bot, message, args) => {
    const target = message.mentions.users.first() || message.author;

    const user = await Levels.fetch(target.id, message.guild.id);

    if (!user) return message.reply("Deneme.");

    const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png'}))
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRequiredXP(neededXp)
        .setStatus(message.member.presence.status)
        .setProgressBar('#FFA500', "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
    rank.build()
        .then(data => {
            const basarim = new Discord.MessageAttachment(data, './rutbe.png')
            message.channel.send(basarim)
        })


    }

    exports.conf = {
        aliases: [],
        permLevel: 0,
      };
      exports.help = {
        name: 'rütbe',
         description: 'daha sonra yazılcak.',
        usage: 'daha sonra yazıclak.'
      };