export default defineEventHandler(async (event) => {
	const gameId = getRouterParam(event, "gameId");

	if (!gameId) {
		throw createError({
			statusCode: 400,
			statusMessage: "Bad Request",
			message: "gameId is required in the URL path.",
		});
	}

	try {
		return GameClass.join(gameId);
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === "Game not found") {
				throw createError({ statusCode: 404, message: error.message });
			}

			if (error.message === "Game is already running") {
				throw createError({ statusCode: 400, message: error.message });
			}
		}

		throw createError({
			statusCode: 500,
			message: "Ein unbekannter Fehler ist aufgetreten.",
		});
	}
});
