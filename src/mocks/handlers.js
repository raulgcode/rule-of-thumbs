import { rest } from "msw";
import { data } from "./data.json";

export const handlers = [
  rest.get("*/api/users", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.put("*/users/:userId/vote", (_, res, ctx) => {
    return res(
      ctx.json({
        success: true,
      })
    );
  }),
];
