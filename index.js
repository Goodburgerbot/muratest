const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require("./config.json");
const prefix = config.json
const ownerID = 459889736438251531
const moment = require("moment")
const cooldown = new Set();

let statuses = ['https://discord.gg/gqGvfbD', 'Made by SsJove#8099', 'My prefix is mu!',]

client.on('ready', () => {

setInterval(function() {

let status = statuses[Math.floor(Math.random()*statuses.length)];

client.user.setPresence({ activity: {name: status }, status: 'online' });

}, 100000)

console.log(`Logged in as ${client.user.tag}!`);
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
const { Permissions } = require('discord.js');
  const permissions = new Permissions([
    'MANAGE_CHANNELS',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MANAGE_ROLES',
  'ADMINISTRATOR',
  'BAN_MEMBERS',
  'KICK_MEMBERS',
  'MANAGE_GUILD',
  'VIEW_AUDIT_LOG',
  'MANAGE_NICKNAMES',
  'MANAGE_WEBHOOKS',
  'MANAGE_MESSAGES',
  'ADD_REACTIONS',
  'CONNECT',
  'SPEAK',
  'MUTE_MEMBERS',
  'DEAFEN_MEMBERS',
  'SEND_MESSAGES',
  'CREATE_INSTANT_INVITE',
]);

  if(command === 'ping') {
    console.log(`ping command`)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
  if (command === `server`) {
	message.channel.send(`${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
}
  if(command === `status`|| command === `st`){
        if(message.author.id == ownerID) {
        client.user.setActivity(`${args.join(' ')}`)
        message.channel.send('Successfully changed status')
    }
  }
  
  if(command === `username`|| command === `un`|| command === `u`){
  if(message.author.id == ownerID) {
  client.user.setUsername(`${args.join(' ')}`)
  message.channel.send('Successfully changed Username')
  }
}
  if(command === `8ball`){
if(!args[0]) message.reply("Please ask a full question!");
let replies = ["Yes.", "No.", "I don't know.", "of course.", "Ask again later", "Most likely", "As I see it, yes", "Not sure", "Maybe", "Nope", "NO - It may cause dissaster!", "My Source say yes", "Most likely no"];

let result = Math.floor((Math.random() * replies.length));
let question = args.slice(0).join(" ");

let ballembed = new Discord.MessageEmbed()
.setAuthor(message.author.tag)
.setColor(`#ee2782`)
.addField(":question:Question", question)
.addField("Answer", replies[result]);
message.channel.send(ballembed);
        console.log(`8ball command done by ${message.author.tag}`);
    }


  if(command === 'say'|| command === 's') {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
        console.log(`say command done by ${message.author.tag}`);
}
 if(command === 'unban'|| command === 'ub') {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(
        "You do not have permissions to do ban, sorry."
      );
    }
    if (isNaN(args[0]))
       message.channel.send("You need to provide an ID.");
    
    let member = args[0];
    if(!member)
       message.reply("Please mention a valid Banned Member ID");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
await message.guild.members.unban(member)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't unban because of : ${error}`));
      if(!permissions.has('BAN_MEMBERS')) {
    message.reply(`${member} has been unbanned by ${message.author.tag} because: ${reason}`);
      console.log(`unban worked!`)
        console.log(`unban done by ${message.author.tag}`);
      }
}
    if (command === "ban") {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(
        "You do not have permissions to ban people, sorry."
      );
    }

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(
        "I don't have permission to ban people contact a staff member to fix this issue."
      );
    }

    let target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!target) {
      return message.channel.send(
        "Invalid arguments provided.\nUsage: " +
          `\`mu!ban <@member> <reason>\``
      );
    }

 if (!target.bannable) {
      return message.channel.send(
        "I cannot ban that user due to role hierarchy."
      );
    }

    let reason = args.slice(1);
    if (!reason) {
      reason = "no reason given";
    }
    
    message.channel.send(`Successfully banned ${target.user.tag}!`);
    target.ban(reason + `Banned by ${message.author.tag}`);
        console.log(`ban done by ${message.author.tag}`);
}

if(command === 'purge'|| command === 'p') {
  message.delete()
    console.log(`purge cmd`)
    if(!permissions.has('MANAGE_MESSAGES'))
          return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");
    message.channel.bulkDelete(deleteCount)
      .then(messages => console.log(`deleted ${messages.size} messages`))
      .catch(error => message.reply(`Couldn't delete messages because of: ${error} Please Contact: **SsJove#8099** For Information On how to fix this`));
              console.log(`purge command done by ${message.author.tag}`);
  }
  if(command === `addrole`){

  let xdemb = new Discord.MessageEmbed()
  .setColor("#00ff00")
  .setTitle(`Addrole command`)
  .addField("Description:", "Add role to member", true)
  .addField("Usage", "mu!addrole [user] [role]", true)
  .addField("Example", "mu!addrole @SsJove role")
.setColor(`#ee2782`)

  if(!permissions.has("MANAGE_ROLES")) return message.channel.send("You don't have permission to do that!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send(xdemb);

  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send("Specify a role!");
  let gRole = message.guild.roles.cache.fetch(`name`, role);
  if(!gRole) return message.channel.send("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.channel.send("This user already have that role.");
  await(rMember.addRole(gRole.id));

    await message.channel.send(`***I just gave ${rMember.user.tag} the ${gRole.name} role!***`)
        console.log(`addrole done by ${message.author.tag}`);
    message.delete();

}


      if(command === 'help1'){
      let embed = new Discord.MessageEmbed()
                 .setAuthor(`Help`, `https://media.discordapp.net/attachments/706156735739723827/706909705460777050/output-onlinepngtools.png`)
           .addFields(
              {name: "purge/p", value: "purge messages", inline: true},
               {name: "ban/b", value: "ban someone", inline: true},
               {name: "kick/k", value: "Kick someone", inline: true},
               {name: "unban/ub", value: "Unban someone [USE THEIR ID]", inline: true},
               {name: "warn", value: "warn someone", inline: true},
           )
                          .setColor(`#ee2782`)
                 message.channel.send(embed)
                         console.log(`help done by ${message.author.tag}`);
   }
      if(command === 'help3'){
      let embed = new Discord.MessageEmbed()
                 .setAuthor(`Help`, `https://media.discordapp.net/attachments/706156735739723827/706909705460777050/output-onlinepngtools.png`)
           .addFields(
               {name: "username/un/u", value: "ban someone", inline: true},
               {name: "status/st", value: "Kick someone", inline: true},
           )
            .setColor(`#ee2782`)
                 message.channel.send(embed)
                         console.log(`help3 done by ${message.author.tag}`);
   }
            if(command === 'help2'){
      let embed = new Discord.MessageEmbed()
                 .setAuthor(`Help`, `https://media.discordapp.net/attachments/706156735739723827/706909705460777050/output-onlinepngtools.png`)
           .addFields(
              {name: "flip", value: "flip a coin", inline: true},
               {name: "wiki", value: "Search something on wikipedia", inline: true},  

               {name: "youtube", value: "Search something on youtube", inline: true},  

               {name: "wikihow", value: "Search something on wikihow", inline: true},  

               {name: "google", value: "Search something on google", inline: true},  

               {name: "urban", value: "Search something on the urban dictionary", inline: true},  

               {name: "morsecode/morse/m", value: "Translate something to morsecode", inline: true},  

               {name: "weather", value: "Check the weather in an area", inline: true},

              {name: "say/s", value: "Make the bot say something", inline: true},
              
              {name: "esay/es", value: "Make the bot say something in an embed", inline: true},
           )
           .setColor(`#ee2782`)
          message.channel.send(embed)
                  console.log(`help2 done by ${message.author.tag}`);
   }
    if(command === 'help'){
       let embed = new Discord.MessageEmbed()
           .setTitle(`Help!`)
           .addField(
               "help1", "Show moderation commands"
           )
           .addField(
           "help2", "Show Fun Commands"
           )   
           .addField(     "Support Server", "[Click here](https://discord.gg/gqGvfbD)")
           .setColor(`#ee2782`)
           message.channel.send(embed)
                   console.log(`help done by ${message.author.tag}`);
   }
if(command === `invite`|| command === `inv`){
       let embed = new Discord.MessageEmbed()
           .setTitle(`Invite me!`)
           .addField(
           "New Server?", "[Yay invite me c:](https://discord.com/api/oauth2/authorize?client_id=706909769176186930&permissions=8&scope=bot)")
           
           .setColor(`#ee2782`)
           message.channel.send(embed)
                   console.log(`invite done by ${message.author.tag}`);
}
   if(command === "flip"){
      function doRandHT() {
var rand = ['HEADS!','TAILS!'];

return rand[Math.floor(Math.random()*rand.length)];
}

 const embed = {
"title": `The Winner Is!`,
"description": doRandHT(),
"color": `#ee2782`,
};
message.channel.send({ embed });
        console.log(`flip command done by ${message.author.tag}`);
};
    if(command === `google`) {
         let google = args.join('+')
    let link = `https://www.google.com/search?q=${google}` ;
	message.channel.send(link); 
            console.log(`google command done by ${message.author.tag}`);
  }
      if(command === `pornhub`) {
          if(message.author.id === ownerID){
         let porn = args.join('+')
    let link = `https://www.pornhub.com/video/search?search=${porn}` ;
	message.channel.send(link);
    }
  }
        if(command === `youtube`) {
         let youtube = args.join('+')
    let link = `https://www.youtube.com/results?search_query=${youtube}` ;
	message.channel.send(link); 
            console.log(`youtube done by ${message.author.tag}`);
  }
      if(command === `reddit`) {
         let reddit = args.join('_')
    let link = `https://www.reddit.com/r/${reddit}` ;
	message.channel.send(link); 
            console.log(`reddit done by ${message.author.tag}`);
  }
        if(command === `wiki`) {
         let wiki = args.join('+')
    let link = `https://en.wikipedia.org/w/index.php?cirrusUserTesting=control&search=${wiki}&title=Special:Search&profile=advanced&fulltext=1&advancedSearch-current=%7B%7D&ns0=1` ;
            console.log(`wiki done by ${message.author.tag}`);
	message.channel.send(link); 
  }  
        if(command === `wikihow`) {
         let wikihow = args.join('+')
    let link = `https://www.wikihow.com/wikiHowTo?search=${wikihow}` ;
	message.channel.send(link); 
            console.log(`wikihow done by ${message.author.tag}`);
  }
        if(command === `urban`) {
         let urban = args.join('%20')
    let link = `https://www.urbandictionary.com/define.php?term=${urban}` ;
	message.channel.send(link); 
            console.log(`urban done by ${message.author.tag}`);
  }

if (command === `guild`) {
  if (message.author.id === ownerID) {
    client.guilds.cache.forEach(guild => {
      const invitechannels = guild.channels.cache.filter(c => client.has.permissionsF(guild.me).has('CREATE_INSTANT_INVITE'));
if (invitechannels.random() != undefined && invitechannels.random() != null) {
        invitechannels.random().createInvite()
          .then(invite => message.channel.send('Created invite for `' + guild.name + '`:\nhttps://discord.gg/' + invite.code))
      }

    })
  } else {
    message.channel.send("Couldn't create invite for `" + message.guild.name + "` due to lack of permissions")
  }
}
if(command === `weather`){
    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if(err) message.channel.send(err)

        //If the place entered is invalid
        if(args === `0`) {
            message.channel.send("**please enter a valid location**")
            return;
        }

        //Variables
        var current = result[0].current //Variable for the current part of the JSON Output
        var location = result[0].location //This is a variable for the location part of the JSON Output

        //Sends weather log in embed
        let embed = new Discord.MessageEmbed()
           .setDescription(`**${current.skytext}**`) //How the sky looks like
           .setAuthor(`Weather for ${current.observationpoint}`) //Shows the current location of the weater
           .setThumbnail(current.imageUrl) //Sets thumbnail of the embed
           .setColor(`#ee2782`) //Sets the color of the embed
           .addField("Timezone", `UTC${location.timezone}`, true) //Shows the timezone
           .addField("Degree Type", location.degreetype, true) //Shows the degrees in Celcius
           .addField("Temperature", `${current.temperature}`, true)
           .addField("Feels like", `${current.feelslike} Degrees`, true)
           .addField("Winds", current.winddisplay, true)
           .addField("Humidity", ` ${current.humidity}%`, true)
           .addField("Day", `${current.day}`, true)
           .addField("Date", `${current.date}`, true)
           
           //Display when it's called
           message.channel.send(embed)
        console.log(`weather done by ${message.author.tag}`);
    });

}
if(command === `morsecode`|| command === `mc` || command === `m`|| command === `morse`){
    let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
				morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
				text = args.join(" ").toUpperCase();
			while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
				text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
			}
			if (text.startsWith(".") || text.startsWith("-")) {
				text = text.split(" ");
				let length = text.length;
				for (i = 0; i < length; i++) {
					text[i] = alpha[morse.indexOf(text[i])];
				}
				text = text.join("");
			} else {
				text = text.split("");
				let length = text.length;
				for (i = 0; i < length; i++) {
					text [i] = morse[alpha.indexOf(text[i])];
				}
				text = text.join(" ");
			}
			return message.channel.send("```"+text+"```");
        console.log(`morse done by ${message.author.tag}`);
}
if(command === `kick`|| command === `k`){
    
  let xdemb = new Discord.MessageEmbed()
  .setColor("#ee2782")
  .setTitle("Kick Command")
  .addField("Description:", `Kick a member`, true)
  .addField("Usage:", "mu!kick [user] [reason]", true)
  .addField("Example:" ,"mu!kick @SsJove spam")

    let member = message.mentions.members.first();
    if(!member) return message.channel.send(xdemb)
      
    if(!member.kickable) 
      return message.channel.send("I cannot kick this user!");

   if(member.user.id === ownerID) return message.channel.send("I can't kick my owner!")

    
    let reason = args.slice(1).join(' ');
    if(!reason) {
      res = "No reason given";
    }
    else {
      res = `${reason}`
    }
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry, I couldn't kick because of : ${error}`));

      let kick = new Discord.MessageEmbed()
      .setColor("#ee2782")
      .setTitle(`Kick | ${member.user.tag}`)
      .addField("User", member, true)
      .addField("Moderator", message.author, true)
      .addField("Reason", reson)

      message.guild.channels.cache.get("713730719939035156").send(kick)
    message.delete();
            console.log(`kick done by ${message.author.tag}`);
}
if(command === `warn`) {
 if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premission to do that!");
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.');
  if (reason.length < 1) return message.reply('You must have a reason for the warning.');


  let dmsEmbed = new Discord.MessageEmbed()
  .setTitle("Warn")
  .setColor("#ee2782")
  .setDescription(`You have been warned on \`${message.guild.name}\``)
  .addField("Warned by", message.author.tag)
  .addField("Reason", reason);

  user.send(dmsEmbed);

  message.delete();
  
  let logEmbed = new Discord.MessageEmbed()
  .setTitle("Warn")
  .setColor("#ee2782")
  .setDescription(`${user} has been warned for ${reason} `)
  .addField("Warned by", message.author.tag)

      message.guild.channels.cache.get("713730719939035156").send(logEmbed)

        console.log(`warn done by ${message.author.tag}`);
}
if(command === `lock`|| command === `lockdown`) {

      if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send(
        "You do not have permissions to do lockdown, sorry."
      );
    }
if(!permissions.has('MANAGE_CHANNELS')) {
  let lockemb = new Discord.MessageEmbed()
  .setTitle(`LockDown Complete`)
  .setColor(`#ee2782`)
  .addField(`Channel ${message.channel} locked by ${message.author.tag} because ${reason}`)

      message.guild.channels.cache.get("713426288936747149").send(lockemb)

    channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
      console.log(`lockdown worked!`)
        console.error(err);
      }
}
  if(command === `apply`) {
      let args = message.content.split(' ').slice(1).join(' ');

    let guild = message.guild;
    const cnl = message.channel.fetch('713135745212088421');
    message.reply('Thx for submitting Application! Your Application is now being reviewed.');

            let reason = args.slice(1).join(' ');
    if(!reason) reason = "No Application provided";

    const embed = new Discord.MessageEmbed()
  .setAuthor(`Application from ${message.author.tag}`, message.author.displayAvatarURL)
  .addField('Application:', `**Application's IGN:** ${message.author.tag}\n**Server:** ${guild.name}\n**Full Application:** ${args}`)
  .setColor(`#ee2782`)
message.guild.channels.cache.get("713135745212088421").send(embed)
}
  if(command === `suggest`|| command === `sgt`) {
      let args = message.content.split(' ').slice(1).join(' ');

    let guild = message.guild;
    const cnl = message.channel.fetch('713135745212088421');
    message.reply(`Thank's for submitting Suggestion! Your Suggestion is now being reviewed.`);

        let reason = args.slice(1).join(' ');
    if(!reason) reason = "No Suggestion provided";

    const embed = new Discord.MessageEmbed()
  .setAuthor(`Suggestion from ${message.author.tag}`, message.author.displayAvatarURL)
  .addField('Suggestion:', `**Suggesters's IGN:** ${message.author.tag}\n**Server:** ${guild.name}\n**Full Suggestion:** ${args}`)
  .setColor(`#ee2782`)
message.guild.channels.cache.get("714809000767520828").send(embed)
}
if(command === `esay` || command == `es`){
    message.delete();
let say = (`${args.join(' ')}`)
const sayemb = new Discord.MessageEmbed()
.setDescription(`${say}`)
message.channel.send(sayemb)
        console.log(`esay command done by ${message.author.tag}`);
}
  if(command === `whois`){
      message.delete();
	let user = message.mentions.users.first() || message.author;
	let whoisembed = new Discord.MessageEmbed()
	.setAuthor(`${user.username}'s Account info`)
  .setColor(`#ee2782`)
  .addFields(
 {name: "Full Username", value: `${user.username}`, inline: true},
 {name: `Bot`, value: `${user.bot}`, inline: true},

 {name: "User Status", value: `${user.presence.status}`, inline: true},

 {name: "User ID", value: `${user.id}`, inline: true}, 

 {name: "User Game", value: `${user.presence.game ? user.presence.game.name : 'None'}`, inline: true},

  {name: "Joined Discord at", value: `${user.createdAt}`, 
  inline: true},
 )
 .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatar)
 .setTimestamp()

message.channel.send(whoisembed)
}

         if(command === `shoot`){
let user = message.mentions.users.first();
if (message.mentions.users.size < 1) return message.reply('You must mention someone shoot them.');


let replies = ["https://tenor.com/view/nagito-komaeda-danganronpa-anime-shoot-go-out-gif-13943614", "https://tenor.com/view/kurumi-tokisaki-anime-shoot-evil-smile-gun-gif-17143539", "https://tenor.com/view/anime-power-shoot-gif-17001405", "https://tenor.com/view/anime-cat-pew-pewpew-shoot-gif-4898188", "https://tenor.com/view/nichijou-sleep-anime-firing-shoot-gif-16780763", ""];

let result = Math.floor((Math.random() * replies.length));

        console.log(`shoot command done by ${message.author.tag}`);
        message.channel.send(`${message.author.tag} Shot ${user} **Blakoww** ${replies[result]}`)
    }

    if(command === `botinfo`|| command === `bi`|| command === `info`){
let botembed = new Discord.MessageEmbed()
    .setAuthor(`${client.user.tag}'s Information`)
    .setColor("#15f153")
    .setDescription(`**Owner**: SsJove#8099 **Users**: ${bot.users.cache.size} **Guilds**: ${bot.guilds.cache.size}`)
    .addField(`Useful Links`, `[Support Server](https://discord.gg/gqGvfbD) - [Invite](https://discord.com/api/oauth2/authorize?client_id=706909769176186930&permissions=8&scope=bot) - [Vote](https://top.gg/bot/706909769176186930/vote)`)
    .setFooter(`Made By SsJove#8099`)
    message.channel.send(botembed);
    }
})
client.on("message", message => {
  if (message.content === 'mu!order tea') {
    message.reply('Heres your Tea! :tea: ');
  }
  if (message.content === 'mu!order ice cream') {
    message.reply('Heres your Ice cream! :ice_cream: ');
  }

  if (message.content === 'mu!order cake') {
    message.reply('Heres your Cake! :cake: ');

  }
  if (message.content === 'ping') {
    msg.reply('pong');
  }
  if (message.content === 'mura') {
    message.channel.send('Present!');
  }
  })
client.login(`NzA2OTA5NzY5MTc2MTg2OTMw.XrxtVw.fD3XnQ9-0l2kFJg3neqrjU0D_KU`);
