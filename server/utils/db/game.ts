import { activityFields, properties, specialProperties } from "~~/shared/cards";
import type { Game, Player } from "~~/shared/gameTypes";

export const games: Game[] = [];
export const MIN_PLAYERS: number = 2;

export const GameClass = {
	get: (gameUuid: string) => {
		const game = games.find((g) => g.uuid === gameUuid);
		if (!game) {
			throw new Error("Game not found");
		}
		return game;
	},
	create: () => {
		const game: Game = {
			uuid: crypto.randomUUID(),
			status: "waiting",
			avaliableColors: [
				"dark_blue",
				"light_blue",
				"dark_yellow",
				"light_yellow",
				"pink",
				"red",
				"orange",
				"green",
			],
			availableHouses: 32,
			availableHotels: 8,
			players: [],
			currentPlayerIdx: 0,
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

		// todo: assign a color to the player
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

		if (game.status === "running") {
			throw new Error("Game is already running");
		}

		if (game.players.length >= MIN_PLAYERS) {
			game.status = "running";
			return game.status;
		}

		throw new Error("Not enough players to start the game");
	},
	nextPlayer: (gameUuid: string) => {
		const game = games.find((g) => g.uuid === gameUuid);
		if (!game) {
			throw new Error("Game not found");
		}

		if (game.status !== "running") {
			throw new Error("Game is not running");
		}

		game.currentPlayerIdx = (game.currentPlayerIdx + 1) % game.players.length;
		return game.currentPlayerIdx;
	},
};
