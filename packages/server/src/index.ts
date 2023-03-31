import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia()
  .use(staticPlugin({ assets: "../client/dist", prefix: "" }))
  .get("/", () => Bun.file("../client/dist/index.html"))
  .listen(9000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
