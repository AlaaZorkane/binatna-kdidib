require("dotenv").config();
const { parse } = require("discord-command-parser");
const { create } = require("./functions/create");
const { games } = require("./functions/games");
const { join } = require("./functions/join");
const { list } = require("./functions/list");
const { client } = require("./utils/client");

client.on("ready", () => {
  console.log("Logged in");
});

const dispatchCommand = (parsed, ctx) => {
  const { command, arguments: args } = parsed;
  switch (command) {
    case "create":
      create(args, ctx);
      break;
    case "join":
      join(args, ctx);
      break;
    case "list":
      list(args, ctx);
      break;
    case "games":
      games(args, ctx);
      break;
    default:
      ctx.reply("Command not found..");
      break;
  }
};

client.on("message", async (ctx) => {
  const parsed = parse(ctx, "!", { allowSpaceBeforeCommand: false });
  if (!parsed.success) return;
  dispatchCommand(parsed, ctx);
});
