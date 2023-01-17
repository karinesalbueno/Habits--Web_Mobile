import fastify from "fastify";

const app = fastify();

app.get("/", () => {
  return "hello!";
});

app.listen({
  port: 3333,
}).then(()=>{
    console.log('rodando')
});
