const { client } = require("../utils/client");
const { database } = require("../utils/firebase");
const { formatTime } = require("../utils/formatTime");
const { gamesDB } = require("./games");

/**
 * Lists the players in a specific game
 * @param time ex. 17:00
 */
const list = async (args, ctx) => {
  const [time] = args;
  const timestamp = formatTime(time);
  try {
    const ctxGame = gamesDB.child(timestamp);
    const isExist = (await ctxGame.once("value")).exists();
    if (!isExist) throw new Error("This game doesn't exist..");
    const players = (await ctxGame.once("value")).val();
    const fields = [];
    for (const id in players) {
      const user = (await ctx.guild.members.fetch(id)).user.tag;
      fields.push({ name: user, value: `Places: ${players[id]}` });
    }
    const embed = {
      title: `Game: ${time}`,
      description: `This is a list of all the players in the **${time}** game:`,
      url: "https://discordapp.com",
      color: 9002029,
      fields,
    };
    ctx.channel.send({ embed });
  } catch (err) {
    console.log(err.message);
    ctx.channel.send(`Error: ${err.message}`);
  }
};

module.exports = { list };
