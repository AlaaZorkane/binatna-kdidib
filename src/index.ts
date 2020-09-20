import * as dotenv from "dotenv-safe";
import "module-alias/register";
dotenv.config();
import { client } from "./utils/client";
import { dispatcher } from "./modules/dispatcher";
import { parse } from "discord-command-parser";

client.on("ready", () => {
  console.log("Logged in");
});

client.on("message", async (ctx) => {
  const parsed = parse(ctx, "!");
  if (!parsed.success) return;
  dispatcher(parsed, ctx);
});
