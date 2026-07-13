// Entry point on the Infomaniak Node hosting (copied into the standalone
// bundle by the deploy workflow; `npm run start` runs this file there).
//
// Runs the Next.js standalone server and watches .next/BUILD_ID. When a
// deploy rsyncs a new build, the BUILD_ID changes: we stop the server and
// exit, and Infomaniak's process supervisor restarts us with the new code.
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const buildIdPath = path.join(__dirname, ".next", "BUILD_ID");
const readBuildId = () => {
  try {
    return fs.readFileSync(buildIdPath, "utf8").trim();
  } catch {
    return null;
  }
};

const initialBuildId = readBuildId();
const child = spawn(process.execPath, [path.join(__dirname, "server.js")], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  process.exit(signal ? 0 : code ?? 0);
});

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => child.kill(signal));
}

setInterval(() => {
  const current = readBuildId();
  if (initialBuildId && current && current !== initialBuildId) {
    console.log(`New build ${current} detected (was ${initialBuildId}); restarting.`);
    child.kill("SIGTERM");
  }
}, 10_000);
