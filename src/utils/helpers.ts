import { Player } from "@/interfaces";
import { gamesDB } from "@/modules/info/games";
import dayjs from "dayjs";
import _ from "lodash";

export const formatTime = (hour: string): number => {
  const day = dayjs().format("YYYY-MM-DD");
  const timestamp = dayjs(`${day}${hour}`).unix();
  return timestamp;
};

export const getTotalPlaces = async (gameID: string): Promise<number> => {
  const players = (await gamesDB.child(gameID).once("value")).val();
  const totalBooked = _.reduce(
    players,
    (sum: number, player: Player) => sum + player,
  );
  return totalBooked as number;
};
