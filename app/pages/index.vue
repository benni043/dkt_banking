<script setup lang="ts">
	const gameStore = useGameStore();

	async function createGame() {
		const response = await $fetch<string>(`/api/game/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});

		console.log(response);
	}

	async function joinGame() {
		const gameId = prompt("Enter game UUID: ");

		if (!gameId || gameId.trim() === "") {
			alert("Aktion abgebrochen: Es wurde keine Game-UUID eingegeben.");
			return;
		}

		try {
			const response = await $fetch<string>(`/api/game/${gameId}/join`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});

			gameStore.playerId = response;

			console.log(response);

			navigateTo(`/game/${gameId}`);
		} catch {}
	}
</script>

<template>
	<div>
		<button type="button" @click="createGame">create game</button>
		<button type="button" @click="joinGame">join game</button>
	</div>
</template>
