import { GameEventStream } from "~~/server/utils/sse";

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);
  GameEventStream.addStream(userId, eventStream);

  return eventStream.send();
});
