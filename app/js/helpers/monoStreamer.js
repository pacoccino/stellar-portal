const streamers = {};

export function newStream(name, stream) {
  if (streamers[name]) {
    streamers[name]();
  }
  streamers[name] = stream;
}

export function killStreams() {
  Object.keys(streamers).forEach((k) => {
    streamers[k]();
    delete streamers[k];
  });
}
