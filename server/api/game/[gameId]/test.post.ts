export default defineEventHandler(async (event) => {
	const gameId = getRouterParam(event, "gameId");
	if (!gameId) throw createError({ statusCode: 400 });

	GameEventStream.sendUpdate(gameId);
});
