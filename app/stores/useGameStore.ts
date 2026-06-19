export const useGameStore = defineStore("game", {
	state: (): { sse: EventSource | undefined } => ({
		sse: undefined,
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
