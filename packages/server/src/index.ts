import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { api } from "./api";

const app = new Elysia()
  .use(staticPlugin({ assets: "../client/dist", prefix: "" }))
  .get("/", () => Bun.file("../client/dist/index.html"))
  .use(api)
  .listen(9000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
