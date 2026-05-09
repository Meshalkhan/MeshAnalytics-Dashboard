import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(
    `[meshanalytics] api ready on http://localhost:${env.port}${env.apiPrefix}`
  );
});

const shutdown = (signal) => {
  console.log(`[meshanalytics] received ${signal}, shutting down`);
  server.close(() => process.exit(0));
};

["SIGINT", "SIGTERM"].forEach((signal) => process.on(signal, () => shutdown(signal)));
