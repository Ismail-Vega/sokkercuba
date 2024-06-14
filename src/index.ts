import { router } from "routes";
import { D1QB } from "workers-qb";
import { Env } from "./types/env";
import { cors } from "itty-router";
import { cleanupExpiredSessions } from "./utils/cleanupExpiredSessions";

const { corsify } = cors();

export default {
  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {
    // Inject query builder in every endpoint
    const qb = new D1QB(env.DB);

    return router
      .handle(request, env, {
        executionContext: ctx,
        qb: qb,
      })
      .then(corsify);
  },
  scheduled: async (event: ScheduledEvent, env: Env, ctx: ExecutionContext) => {
    const qb = new D1QB(env.DB);
    ctx.waitUntil(
      cleanupExpiredSessions({
        executionContext: ctx,
        qb: qb,
      })
    );
  },
};
