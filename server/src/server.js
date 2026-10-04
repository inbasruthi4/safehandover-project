import 'dotenv/config';
import { app, prisma } from './app.js';
const port=Number(process.env.PORT||4000);
const server=app.listen(port,()=>console.log(`SafeHandover API listening on ${port}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{server.close();await prisma.$disconnect();process.exit(0);});
