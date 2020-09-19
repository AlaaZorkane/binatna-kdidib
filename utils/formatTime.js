const dayjs = require("dayjs");

const formatTime = (hour) => {
  const day = dayjs().format("YYYY-MM-DD");
  const timestamp = dayjs(`${day}${hour}`).unix();
  return timestamp;
};

module.exports = { formatTime };
