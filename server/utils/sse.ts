import type { EventStream } from "h3";

const todosEventStreams: Map<string, EventStream[]> = new Map();

export const GameEventStream = {
  addStream(userId: string, eventStream: EventStream) {
    addEventStream(userId, todosEventStreams, eventStream);
  },
  async sendUpdate(userId: string) {
    await publish(userId, todosEventStreams, await Game.getAll(userId));
  },
};

function addEventStream(
  key: string,
  eventStreams: Map<string, EventStream[]>,
  eventStream: EventStream,
) {
  if (!eventStreams.has(key)) {
    eventStreams.set(key, []);
  }
  const eventStreamList = eventStreams.get(key)!;

  eventStreamList.push(eventStream);

  eventStream.onClosed(async () => {
    eventStreamList.splice(eventStreamList.indexOf(eventStream), 1);
    await eventStream.close();
  });
}

async function publish(
  key: string,
  eventStreams: Map<string, EventStream[]>,
  data: object,
) {
  const json = JSON.stringify(data);

  const eventStreamList = eventStreams.get(key) ?? [];

  eventStreamList.forEach((eventStream) => {
    eventStream.push(json);
  });
}
