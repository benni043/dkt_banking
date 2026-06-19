<script setup lang="ts">
	const route = useRoute();
	const gameStore = useGameStore();

	onMounted(() => {
		gameStore.initSSE(route.params.gameId as string);
	});

	function test() {
		$fetch(`/api/game/${route.params.gameId}/test`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});
	}
</script>

<template>
	<button type="submit" @click="test()">send test post</button>
</template>
