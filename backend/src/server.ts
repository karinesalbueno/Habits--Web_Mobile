import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const prisma = new PrismaClient();

app.get("/", async() => {
  const habits =  await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'beber'
      }
    }
  });
  return habits
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("rodando");
  });
