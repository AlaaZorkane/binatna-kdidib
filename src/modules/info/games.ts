import { ModuleCommand } from "@/types";
import { db } from "@/utils/database";
import { getTotalPlaces } from "@/utils/helpers";
import dayjs from "dayjs";
import { MessageEmbed } from "discord.js";

export const gamesDB = db().ref("/games/");

export const games: ModuleCommand = async (args, ctx) => {
  try {
    const allGames = (await gamesDB.once("value")).val();
    if (!allGames)
      throw new Error(
        "No games running, why don't you create one with !join [HOUR] ?",
      );
    const embed = new MessageEmbed()
      .setColor("#9400D3")
      .setTitle("Available Games")
      .setDescription("Abida imposter 🔪");
    for (const gameID in allGames) {
      const totalBooked = await getTotalPlaces(gameID);
      const formattedTime = dayjs.unix(Number(gameID)).format("dddd - HH:mm");
      embed.addField(formattedTime, `${totalBooked} / 10 players`);
    }
    ctx.channel.send({ embed });
  } catch (err) {
    ctx.channel.send(`\`error\` ${err.message}`);
  }
};

gamesDB.on("child_added", () => {
  // inform players somehow in a channel that a new game has been created.
  console.log("new game");
});
