import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "types/env";
import { IRequest } from "itty-router";
import { Context } from "interfaces/context";

export class PostTeamData extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Teams"],
    summary: "Insert Team data",
    requestBody: {
      data: z.record(z.string(), z.any()),
    },
    responses: {
      "200": {
        description: "Returns success",
        schema: {
          success: Boolean,
          schema: { success: Boolean },
        },
      },
      "400": {
        description: "Returns failed",
        schema: {
          success: Boolean,
          error: z.string(),
        },
      },
    },
  };

  async handle(
    request: IRequest,
    env: Env,
    context: Context,
    data: Record<string, any>
  ) {
    const { body } = data;
    const userSession = env.userSession;
    const teamId = body?.data?.team?.id;

    if (!body?.data || !teamId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Required team data missing! => ${
            !teamId ? "team Id." : "body data."
          }`,
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 400,
        }
      );
    }

    try {
      await context.qb
        .insert({
          tableName: "teams",
          data: {
            id: teamId,
            user_id: userSession.user_id as number,
            metadata: JSON.stringify(body.data),
          },
        })
        .execute();

      await context.qb
        .update({
          tableName: "users",
          data: {
            team_id: teamId,
          },
        })
        .execute();

      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        status: 200,
      });
    } catch (e) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `An error occurred when trying to create team data. ${
            e?.message || e ? "Info: " + (e?.message || e) : ""
          }`,
        }),
        {
          status: 500,
        }
      );
    }
  }
}
