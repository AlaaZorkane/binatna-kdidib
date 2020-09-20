import { ModuleCommand } from "@/types";
import { SuccessfulParsedMessage } from "discord-command-parser";
import { Message } from "discord.js";
import { join } from "./booking/join";
import { leave } from "./booking/leave";
import { games } from "./info/games";
import { list } from "./info/list";

const AvailableCommands: Record<string, ModuleCommand> = {
  games,
  join,
  list,
  leave,
};

export const dispatcher = (
  parsed: SuccessfulParsedMessage<Message>,
  ctx: Message,
) => {
  try {
    const command = AvailableCommands[parsed.command];
    if (!command) throw new Error("Unknown command :( try !help?");
    command(parsed.arguments, ctx);
  } catch (err) {
    ctx.channel.send(err.message);
  }
};
