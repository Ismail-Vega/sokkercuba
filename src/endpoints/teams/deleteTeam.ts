import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "types/env";
import { IRequest } from "itty-router";
import { Context } from "interfaces/context";

export class DeleteTeamData extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Teams"],
    summary: "Delete an existing Team",
    parameters: {
      id: { type: z.number(), location: "path" },
    },
    responses: {
      "200": {
        description: "Returns success",
        schema: {
          success: Boolean,
        },
      },
      "500": {
        description: "Returns failed",
        schema: {
          success: Boolean,
          error: z.string(),
        },
      },
    },
  };

  async handle(request: IRequest, env: Env, context: Context) {
    const { params } = request;
    const teamId = params?.id;

    if (!teamId) {
      return new Response(
        JSON.stringify({
          error: "Required parameter teamId missing!",
        }),
        { status: 400 }
      );
    }

    try {
      await context.qb
        .delete({
          tableName: "teams",
          where: { conditions: ["id = ?1"], params: [teamId] },
        })
        .execute();

      await context.qb
        .update({
          tableName: "users",
          data: {
            team_id: null,
          },
        })
        .execute();

      return { success: true };
    } catch (e) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `An error occurred when trying to delete team data. ${
            e?.message || e ? "Info: " + (e?.message || e) : ""
          }`,
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 500,
        }
      );
    }
  }
}
