import { Elysia } from "elysia";
import { weatherApi } from "./weather";

export const api = (app: Elysia) =>
  app.group("/api", (app) => app.use(weatherApi));
