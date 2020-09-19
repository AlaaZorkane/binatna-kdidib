const dayjs = require("dayjs");
const database = require("../utils/firebase");
const { formatTime } = require("../utils/formatTime");

const create = (args, ctx) => {
  const [time] = args;
  // todo: better checking
  if (!time.includes(":")) {
    ctx.reply("Invalid arg");
    return;
  }
  const timestamp = formatTime(time);
  const newGame = database.ref(`/games/${timestamp}/`);
  newGame.set({ moderator: 0 });
};

module.exports = { create };
