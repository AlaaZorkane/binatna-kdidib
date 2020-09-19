const database = require("../utils/firebase");

const gamesDB = database.ref("/games/");

const games = async (args, ctx) => {
  const allGames = await gamesDB.once("value");
  ctx.reply(`\`\`\`json
  JSON.stringify(allGames)
  \`\`\`
  `);
};

gamesDB.on("child_added", () => {
  // inform players somehow in a channel that a new game has been created.
  console.log("new game");
});

module.exports = { games, gamesDB };
