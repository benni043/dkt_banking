import { GameEventStream } from "~~/server/utils/sse";

export default defineEventHandler(async (event) => {
	const gameId = getRouterParam(event, "gameId");
	if (!gameId) throw createError({ statusCode: 400 });

	const eventStream = createEventStream(event);
	GameEventStream.addStream(gameId, eventStream);

	return eventStream.send();
});
