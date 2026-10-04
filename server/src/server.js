/*
 * SAFEHANDOVER - SERVER ENTRY POINT
 * ---------------------------------
 * This file starts the Express HTTP server using the application
 * exported from app.js.
 *
 * RESPONSIBILITIES:
 * 1. Read the server port from the environment.
 * 2. Start the SafeHandover API.
 * 3. Handle graceful shutdown signals.
 * 4. Close active server connections before termination.
 * 5. Disconnect the Prisma database client during shutdown.
 *
 * CONFIGURATION:
 * The PORT environment variable can be used to configure the server.
 * If it is not provided, the application uses port 4000.
 *
 * GRACEFUL SHUTDOWN:
 * SIGINT and SIGTERM are handled so that the HTTP server and database
 * connection can be closed cleanly instead of terminating abruptly.
 *
 * This file is intentionally kept separate from app.js so that the
 * Express application can be imported independently for testing.
 */
import 'dotenv/config';
import { app, prisma } from './app.js';
const port=Number(process.env.PORT||4000);
const server=app.listen(port,()=>console.log(`SafeHandover API listening on ${port}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{server.close();await prisma.$disconnect();process.exit(0);});
