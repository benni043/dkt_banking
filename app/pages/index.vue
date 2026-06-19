<script setup lang="ts">
const gameStore = useGameStore();

async function createGame() {
    const response: { gameId: string } = await $fetch(`/api/game/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
}

async function joinGame() {
    const gameId = 2;

    const response: { playerId: string } = await $fetch(
        `/api/game/${gameId}/join`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        },
    );

    gameStore.playerId = response.playerId;
}
</script>

<template>
    <div>
        <button type="button" @click="createGame">create game</button>
        <button type="button" @click="joinGame">join game</button>
    </div>
</template>
