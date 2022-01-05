require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_SCHEDULED_EVENTS] });

client.login(process.env.BOT_TOKEN);

const wallaceQuotes = ["Alá o cara cago em pé no terminal sao matheuskkkkkkkkkkkkkkj",
                       "O pedreiro viu o cara cagando ahahahah", 
                       "E o dia que ele escondeu a trakinas hein esse foi foda", 
                       "Estrago as chance dele pq derrubou uma prateleira de doritos", 
                       "Lua vai iluminar os pensamentos dela",
                       "Tiramo 9,5 no tcc fodase"];

client.on("ready", () => {
    console.log("Oi Susan, tá");
});

client.on("guildCreate", guild=>{
    guild.systemChannel.send('Bota na cabeça que estilo num é marra');
});

client.on("messageUpdate", msg => {
    msg.reply(`Eae ${msg.author} ta editando né pilantra`);
})

client.on("messageDelete", msg => {
    msg.channel.send(`Eae ${msg.author} ta apagando as mensagens pq seu comedia!?!`);
})

client.on("messageCreate", async(msg)=>{
    if (msg.content === "bao?") {
        msg.channel.send("aoba ces tao bao?");
    }
 
    if(msg.content === '!luvas'){
        msg.channel.send(`Já lavo o pinto hj luvas? <@349736021115666445>`);
    }
    if(msg.content === '!wallace'){
        let quote = Math.floor(Math.random() * wallaceQuotes.length);
        msg.channel.send(`${wallaceQuotes[quote]}`);
    }
});
