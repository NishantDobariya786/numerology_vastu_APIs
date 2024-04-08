import { connectDB } from "./db/connectDB";
import { mountCriticalErrorHandlers } from "./helpers/gracefulShutDownHandlers";
import { registerPlugins } from "./register";

const init = async () => {
  const server = await registerPlugins();
  await connectDB();
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

mountCriticalErrorHandlers();

init();
