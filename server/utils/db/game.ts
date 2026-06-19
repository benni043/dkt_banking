import type { Game, Player } from "~~/shared/gameTypes";
import { properties, specialProperties, activityFields } from "~~/shared/cards";

export const games: Game[] = [];
export const MIN_PLAYERS: number = 2;

export const GameClass = {
  create: () => {
    const game: Game = {
      uuid: crypto.randomUUID(),
      status: "waiting",
      availableHouses: 32,
      availableHotels: 8,
      players: [],
      currentPlayerId: undefined,
      cards: {
        properties: properties,
        specialProperties: specialProperties,
        activityFields: activityFields,
      },
    };

    games.push(game);
    return game.uuid;
  },
  join: (gameUuid: string) => {
    const game = games.find((g) => g.uuid === gameUuid);
    if (!game) {
      throw new Error("Game not found");
    }

    if (game.status === "running") {
      throw new Error("Game is already running");
    }

    const player: Player = {
      uuid: crypto.randomUUID(),
      color: "red",
      hasEscapePrisonCard: false,
      money: 1500,
    };

    game.players.push(player);

    return player.uuid;
  },
  start: (gameUuid: string) => {
    const game = games.find((g) => g.uuid === gameUuid);
    if (!game) {
      throw new Error("Game not found");
    }

    if (game.players.length > MIN_PLAYERS) {
      game.status = "running";
    }
  },
};
