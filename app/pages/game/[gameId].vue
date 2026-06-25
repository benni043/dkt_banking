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
    <button type="submit" @click="test()">send test post</button>
    <button type="button" @click="startGame()">start game</button>
</template>
