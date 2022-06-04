process.stdin.on("end", () => {
  console.error("Received End");
  process.exit(0);
});

process.stdin.resume();

process.stdin.on("data", (data) => console.log("received: " + data));

setInterval(() => console.log("still here"), 2000);
