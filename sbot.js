const Discord = require("discord.js");
const client = new Discord.Client();
const responseObject = {
  "lol": "hahahahahahaah...",
  "wat": "Nani?",
  "wut": "Nani?",
  "Omae wa mou shindeiru": "Nani!",
  "ply?": "Lifeless",
  "ply": "Get a life",
  "hi": "hey! succ my d",
};

// Set the prefix
let prefix = ".";
client.on("message", (message) => {

  if(responseObject[message.content]) {
    message.channel.send(responseObject[message.content]);
  }

  if (message.content.startsWith(prefix + "help")) {
    message.channel.send("Sorry helps are not available at this time. Smt is still writing them :)");
  } 
  if (message.content.startsWith(prefix + "about")) {
    message.channel.send("I'm self bot of soe min thant and I maintains the gp. U can also give me orders and commands but most are still under development. Basically I'm smt ;). Type '.help' for more.");
  } 
  if (message.content.startsWith("morning")) {
    message.channel.send("No one cares.");
  } 
  if (message.content.startsWith("good morning")) {
    message.channel.send("No one cares, dude.");
  }
  if (message.content.startsWith("Good Morning")) {
    message.channel.send("No one cares. But morning.");
  }
  if (message.content.startsWith("Good morning")) {
    message.channel.send("ok.");
  }
  if (message.content.startsWith("Good Night!")) {
    message.channel.send("Yes! Oyasumi..");
  }
  if (message.content.startsWith("good night")) {
    message.channel.send("One last fap before sleep?");
  }
  if (message.content.startsWith("good")) {
    message.channel.send("Nice");
  }
  if (message.content.startsWith("G")) {
    message.channel.send("good");
  }
  if (message.content.startsWith("Low mad")) {
    message.channel.send("Who? Tse?");
  }
  if (message.content.startsWith("@everyone")) {
     message.reply("NOOOOO").then(/* ... */).catch(console.error);
  }
  
});

client.login("Mzk2MTYyMzIxMjg3NzQxNDQx.DSdprA.nNHXvN_fx4zR8yEONtYc9HUzyiU");