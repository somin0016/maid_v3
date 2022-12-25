const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [
	GatewayIntentBits.DirectMessages,
  	GatewayIntentBits.Guilds,
  	GatewayIntentBits.GuildBans,
  	GatewayIntentBits.GuildMessages,
  	GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// intents = Client.Intents.default();
// intents.messages = True;
// bot = commands.Bot(command_prefix='.', help_command=None, case_insensitive=True, intents=intents);

// const responseObject = {
// 	"Wat": "Nani?",
// 	"Wut": "Nani?",
// 	"Omae wa mou shindeiru": "Nani!!!",
// 	"ply?": "Lifeless",
// 	"ply": "Get a life",
//   };

let prefix = ".";
client.on( 'messageCreate', (message) => {
    // if(responseObject[message.content]) {
    // message.reply(responseObject[message.content]);
    // }
    // if (message.content.startsWith(prefix + "help")) {
    // message.channel.send("Sorry helps are not available at this time. Smt is still writing them :)");
    // } 
    // if(message.content.startsWith(prefix + "smt")){
    //    message.channel.send("09250354704");
    //  } 
    // if(message.content.startsWith(prefix + "oak")){
    //    message.channel.send("09421037602");
    //  } 
    // if(message.content.startsWith(prefix + "sethu")){
    //    message.channel.send("09429884734");
    //  } 
    // if(message.content.startsWith(prefix + "mmk")){
    //    message.channel.send("09445665313");
    //  } 
    // if(message.content.startsWith(prefix + "kkz")){
    //    message.channel.send("09451321885");
    //  } 
    // if(message.content.startsWith(prefix + "arkar")){
    //    message.channel.send("09428632021");
    //  }
    //  if(message.content.startsWith(prefix + "kst")){
    //    message.channel.send("09771028800");
    //  }
    // if(message.content.startsWith(prefix + "everyone")){
    //    message.channel.send("smt - 09250354704");
    //    message.channel.send("oak - 09421037602");
    //    message.channel.send("kkz - 09451321885");
    //    message.channel.send("mmk - 09445665313");
    //    message.channel.send("sethu - 09429884734");
    //    message.channel.send("arkar - 09428632021");
    //    message.channel.send("kst - 09771028800");
    //  }
    // if (message.content.startsWith(prefix + "about")) {
    // message.channel.send("I'm self bot of soe min thant and I maintain the gp. U can also give me orders and commands but most are still under development. Basically I'm smt ;). Type '.help' for more.");
    // } 
  if (message.content.startsWith("@everyone")) {
	message.reply("**Don't mention Everyone.** \nJust mention specific `@Users` or `@Roles`.").then(/* ... */).catch(console.error);
	}
});


// Log in to Discord with your client's token
client.login(token);