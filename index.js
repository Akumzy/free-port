const Net = require("net");
function isPortTaken(port) {
  return new Promise((resolve, reject) => {
    const tester = Net.createServer()
      .once("error", err => {
        if (err.code == "EADDRINUSE") {
          resolve(true);
        } else {
          reject(err);
        }
      })
      .once("listening", () =>
        tester.once("close", () => resolve(false)).close()
      )
      .listen(port);
  });
}

/**
 * Lookup for an unused port starting
 * from them `offset`
 * default `offset = 9000`
 */
async function getPort(offset = 9000) {
  while (await isPortTaken(offset)) {
    offset++;
  }
  return offset;
}
module.exports = getPort;
