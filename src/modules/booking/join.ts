import { formatTime, getTotalPlaces } from "@/utils/helpers";
import { gamesDB } from "../info/games";
import { MAX_PLAYERS } from "@/utils/constants";
import { ModuleCommand } from "@/types";

/**
 * Joins you to a game
 * @param {*} time ex. 17 | 20 | 23
 * @param {*} places ex. 2
 */
export const join: ModuleCommand = async (args, ctx) => {
  const [time, places] = args;
  const timestamp = String(formatTime(time));
  try {
    const bookedPlaces = Number(places) || 1;
    const ctxGame = gamesDB.child(timestamp);
    const totalBooked = await getTotalPlaces(timestamp);
    if (bookedPlaces + totalBooked > MAX_PLAYERS)
      throw new Error(
        `Not enough places, free places: ${MAX_PLAYERS - totalBooked}`,
      );
    await ctxGame.child(ctx.author.id).set(bookedPlaces);
    ctx.reply("Done");
  } catch (err) {
    console.log(err);
    ctx.reply(`Error: ${err.message}`);
  }
};
