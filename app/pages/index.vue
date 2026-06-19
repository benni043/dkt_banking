<script setup lang="ts">
async function createGame() {
    const response = await $fetch(`/api/game`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    console.log(response);
}
</script>

<template>
    <div>
        <button>create game</button>
    </div>
</template>
