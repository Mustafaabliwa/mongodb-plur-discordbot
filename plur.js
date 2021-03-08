const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const config = require('./config.json'); 
const mongoose = require('mongoose');
require('./util/Loader')(client);
const fs = require('fs');
const moment = require('moment');

var prefix = config.prefix;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`Yüklenen komut: ${props.help.name}.`);
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

const giriscikis = require('./modules/giriş-çıkış')
client.on('guildMemberAdd', member => {
  member.guild.channels.cache.get('816964831180619787').send('**' + member.user.username + '**, Kullanıcı sunucuya giri yaptı. ');
})

client.on('guildMemberRemove', member => {
  member.guild.channels.cache.get('816964831180619787').send('**' + member.user.username + '**, Kullanıcı sunucudan ayrıldı.');
})


mongoose.connect("mongodb+srv://dbAdemcan:adem4735@cluster0.qvrw9.mongodb.net/plurbot?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.on('ready', () => {
  console.log(`Giriş yapıldı, ${client.user.tag}`);
});

client.on('message', message => {
    if (message.content === 'p!ping') {  
      message.channel.send(`PİNG ${Date.now() - message.createdTimestamp}ms. ${Math.round(client.ws.ping)}ms`);
    }
  });

 
  
  client.elevation = message => {
    if (!message.guild) {
      return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === config.sahip) permlvl = 4;
    return permlvl;
  };
  

client.login(config.token);