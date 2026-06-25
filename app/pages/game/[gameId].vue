<script setup lang="ts">
const route = useRoute();
const gameStore = useGameStore();

onMounted(() => {
    gameStore.initSSE(route.params.gameId as string);
});

async function startGame() {
    try {
        const response = await $fetch<string>(
            `/api/game/${route.params.gameId}/start`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            },
        );

        console.log(response);
    } catch {}
}
</script>

<template>
    <button type="button" @click="startGame()">start game</button>
</template>
