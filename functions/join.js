const { formatTime } = require("../utils/formatTime");
const { gamesDB } = require("./games");
const _ = require("lodash");
const { MAX_PLAYERS } = require("../utils/constants");

/**
 * Joins you to a game
 * @param {*} time ex. 17:00
 * @param {*} places ex. 2
 */
const join = async (args, ctx) => {
  const [time, places] = args;
  const timestamp = formatTime(time);
  try {
    let bookedPlaces = Number(places) || 1;
    const ctxGame = gamesDB.child(timestamp);
    const players = (await ctxGame.once("value")).val();
    const totalBooked = _.reduce(players, (sum, player) => sum + player);
    if (bookedPlaces + totalBooked > MAX_PLAYERS)
      throw new Error(
        `Not enough places, free places: ${MAX_PLAYERS - totalBooked}`
      );
    await ctxGame.child(ctx.author.id).set(bookedPlaces);
    ctxGame.child("moderator").set(null);
    ctx.reply("Done");
  } catch (err) {
    console.log(err);
    ctx.reply(`Error: ${err.message}`);
  }
};

module.exports = { join };
