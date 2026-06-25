<script setup lang="ts">
	const route = useRoute();
	const gameStore = useGameStore();

	onMounted(() => {
		gameStore.initSSE(route.params.gameId as string);
	});

	async function startGame() {
		try {
			await $fetch<string>(`/api/game/${route.params.gameId}/start`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});
		} catch {}
	}

	async function nextPlayer() {
		try {
			await $fetch(`/api/game/${route.params.gameId}/nextPlayer`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});
		} catch {}
	}
</script>

<template>
	<button type="button" @click="startGame()">start game</button>

	<button type="button" @click="nextPlayer()">next player</button>
</template>
