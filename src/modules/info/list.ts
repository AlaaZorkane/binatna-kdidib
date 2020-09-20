import { ModuleCommand } from "@/types";
import { formatTime } from "@/utils/helpers";
import dayjs from "dayjs";
import { MessageEmbed } from "discord.js";
import { gamesDB } from "./games";

/**
 * Lists the players in a specific game
 * @param time ex. 17
 */
export const list: ModuleCommand = async (args, ctx) => {
  const [time] = args;
  if (time === "20:20") {
    ctx.reply("habt mn jbel?");
    return;
  }
  const timestamp = formatTime(time);
  try {
    if (!ctx.guild) throw new Error("Unknown error...");
    const ctxGame = gamesDB.child(String(timestamp));
    const isExist = (await ctxGame.once("value")).exists();
    if (!isExist) throw new Error("This game doesn't exist..");
    const players = (await ctxGame.once("value")).val();
    const formattedTime = dayjs.unix(timestamp).format("dddd HH:mm");
    const embed = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle(`Among Us - ${formattedTime}`)
      .setDescription(
        `This is a list of all the players in the ${formattedTime}\nType **!join ${time}** to join them!`,
      );
    let total = 0;
    for (const id in players) {
      const user = (await ctx.guild.members.fetch(id)).user.tag;
      embed.addField(user, `Places: ${players[id]}`);
      total += players[id];
    }
    embed.setFooter(`Total players: ${total} / 10`);
    ctx.channel.send({ embed });
  } catch (err) {
    console.log(err.message);
    ctx.channel.send(`Error: ${err.message}`);
  }
};
