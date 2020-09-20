import { Message } from "discord.js";

export type ModuleCommand = (args: string[], ctx: Message) => void;
