require('dotenv').config();

const Discord = require("discord.js");
const Distube = require("distube").default;
const config = require("../config.json");

const client = new Discord.Client({
  intents: 641,
});

const distube = new Distube(client, {
    emitNewSongOnly: false,
    searchSongs: 0,
  });


client.once("ready", () => {
    console.log("Oi Susan, tá");
});

distube.on("playSong", (queue, song) => {
    let playembed = new Discord.MessageEmbed()
      .setTitle(`tocando `)
      .setThumbnail(song.thumbnail)
      .setDescription(`[${song.name}](${song.url})`)
      .addField("duracao", `${song.formattedDuration.toString()}`, true)
    queue.textChannel.send({ embeds: [playembed] });
  });
  distube.on("addSong", (queue, song) => {
    let playembed = new Discord.MessageEmbed()
      .setTitle(`adicionei na playlist `)
      .setThumbnail(song.thumbnail)
      .setDescription(`[${song.name}](${song.url})`)
      .addField("duracao", `${song.formattedDuration.toString()}`, true)
        ;
  
    queue.textChannel.send({ embeds: [playembed] });
  });
  distube.on('addList', (queue, plalist) => {
    let playembed = new Discord.MessageEmbed()
      .setTitle(`bota o amendoim no buraco do amendoim`)
      .setThumbnail(plalist.thumbnail)
      .setDescription(`[${plalist.name}](${plalist.url})`)
      .addField("duracao", `${plalist.formattedDuration.toString()}`, true)
     ;
  
    queue.textChannel.send({ embeds: [playembed] });
  })



client.on("guildCreate", guild=>{
    guild.systemChannel.send('Bota na cabeça que estilo num é marra');
});

client.on("messageCreate", async(msg)=>{ 
    if( !msg.guild || msg.author.bot || !msg.content.startsWith(config.prefix)) return;

    let args = msg.content.slice(config.prefix.length).split(" ");
    let cmd  = args.shift()?.toLowerCase();
    
    if(cmd === 'luvas'){
        msg.channel.send(`Já lavo o pinto hj luvas? <@349736021115666445>`);
    }
    else if(cmd === 'wallace'){
        let quote = Math.floor(Math.random() * wallaceQuotes.length);
        msg.channel.send(`${wallaceQuotes[quote]}`);
    }else if(cmd === 'play'){
        let search = args.join(" ");
        let channel = msg.member.voice.channel;
        let queue = distube.getQueue(msg.guildId);
        if(!channel){
            return msg.reply('Entra num canal de audio antes né o burro');
        }
        if(!search){
            return msg.reply('Fala direito caralho');
        }
        distube.play(msg, search);
    }
});  

client.login(process.env.BOT_TOKEN);