export const useGameStore = defineStore("game", {
	state: (): {
		sse: EventSource | undefined;
		gameId: string | undefined;
		playerId: string | undefined;
	} => ({
		sse: undefined,
		gameId: undefined,
		playerId: undefined,
	}),
	actions: {
		reset() {
			this.stopSSE();
		},
		async initSSE(game: string) {
			this.stopSSE();
			this.sse = new EventSource(`/api/game/${game}/sse`);

			this.sse.onmessage = (event) => {
				const info = JSON.parse(event.data);

				console.log(info);
			};
		},
		stopSSE() {
			if (!this.sse) return;
			this.sse.close();
		},
	},
});
