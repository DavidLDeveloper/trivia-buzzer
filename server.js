let GAME_FROZEN = false;
const server = Bun.serve({
  port: process.env.PORT || 3000,
  publishToSelf: true,
  fetch(request) {
    const path = new URL(request.url).pathname;
    if (path === "/socket") {
      const username = new URL(request.url).searchParams.get("name");

      // Upgrade request to WebSocket.
      if (server.upgrade(request, { data: { username } })) {
        return; // Don't return response on successs.
      }
      // Handle error
      return new Reponse("Failed to initial socket.", { status: 500 });
    }

    // Health
    if (path === "/api/health") return Response.json({ status: "Ok" });
    // 404
    return Response("404!", { status: 404 });
  },
  websocket: {
    idleTimeout: 600,
    open(ws) {
      ws.subscribe("game");
      console.log(`${ws.data.username} has connected.`);
    },
    close(ws, code, msg) {
      ws.unsubscribe("game");
      console.log(`${ws.data.username} has disconnected.`);
    },
    message(ws, msg) {
      const user = ws.data.username;
      try {
        // Expect msg in JSON format: {type: <string>, payload: <string>}
        const message = JSON.parse(msg);
        const { type, payload } = message;

        // Handle game events.
        switch (type) {
          case "BUZZ":
            if (!GAME_FROZEN) {
              GAME_FROZEN = true;
              server.publish(
                "game",
                JSON.stringify({ type: "FREEZE", payload: user })
              );
              console.log(`${user} buzzed in.`);
            } else {
              console.log(`${user} was too slow.`);
            }
            break;
          case "RESET":
            GAME_FROZEN = false;
            server.publish("game", JSON.stringify({ type: "UNFREEZE" }));
            console.log("Controller has sent unfreeze.");
            break;
          default:
            console.log(`Invalid type '${type}' received from ${user}`);
        }
      } catch {
        console.log(`Invalid message format.`);
      }
    },
  },
  static: {
    // Serve game views.
    "/": new Response(await Bun.file("./index.html").bytes()),
    "/buzzer": new Response(await Bun.file("./buzzer.html").bytes()),
    "/control": new Response(await Bun.file("./control.html").bytes()),
  },
});

// Start server.
console.log(`Server is listening on ${server.url}`);
