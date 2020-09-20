import { formatTime } from "@/utils/helpers";
import { gamesDB } from "../info/games";
import { ModuleCommand } from "@/types";
import dayjs from "dayjs";

/**
 * Leaves from a game
 * @param {*} time ex. 17 | 20 | 23
 */
export const leave: ModuleCommand = async (args, ctx) => {
  const [time] = args;
  const timestamp = formatTime(time);
  try {
    const ctxGame = gamesDB.child(String(timestamp));
    await ctxGame.child(ctx.author.id).set(null);
    const formattedTime = dayjs.unix(timestamp).format("dddd - HH:mm");
    ctx.channel.send(`You successfully left the ${formattedTime} game.`);
  } catch (err) {
    console.log(err);
    ctx.channel.send(`\`error\` ${err.message}`);
  }
};
