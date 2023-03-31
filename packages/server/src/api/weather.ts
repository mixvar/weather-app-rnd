import { Elysia, t } from "elysia";

export const weatherApi = (app: Elysia) =>
  app.group("/weather", (app) =>
    app
      .get(
        "/test",
        async () => {
          const resp = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=50.06&longitude=19.94&hourly=temperature_2m,precipitation,cloudcover,windspeed_10m&forecast_days=3`
          );

          return resp.json();
        },
        {
          schema: {
            response: Models.GetForecastResponse,
          },
        }
      )
      .post(
        "/get-forecast",
        async ({ body }) => {
          console.log(body);
          const { latitude, longitude, days } = body;

          const resp = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_days=${days}&hourly=temperature_2m,precipitation,cloudcover,windspeed_10m`
          );

          return resp.json();
        },
        {
          schema: {
            body: Models.GetForecastRequest,
            response: Models.GetForecastResponse,
          },
        }
      )
  );

namespace Models {
  export const GetForecastRequest = t.Object({
    latitude: t.Number(),
    longitude: t.Number(),
    days: t.Number(),
  });

  export const GetForecastResponse = t.Object({
    latitude: t.Number(),
    longitude: t.Number(),
    generationtime_ms: t.Number(),
    hourly_units: t.Object({
      time: t.String(),
      temperature_2m: t.String(),
      precipitation: t.String(),
      cloudcover: t.String(),
      windspeed_10m: t.String(),
    }),
    hourly: t.Object({
      time: t.Array(t.String()),
      temperature_2m: t.Array(t.Number()),
      precipitation: t.Array(t.Number()),
      cloudcover: t.Array(t.Number()),
      windspeed_10m: t.Array(t.Number()),
    }),
  });
}
