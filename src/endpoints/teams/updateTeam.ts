import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "types/env";
import { IRequest } from "itty-router";
import { Context } from "interfaces/context";

export class UpdateTeamData extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Teams"],
    summary: "Update an existing Team",
    parameters: {
      id: { type: z.number().describe("Team id"), location: "path" },
    },
    requestBody: {
      data: z.record(z.string(), z.any()),
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

  async handle(
    request: IRequest,
    env: Env,
    context: Context,
    data: Record<string, any>
  ) {
    const { body } = data;
    const { params } = request;
    const teamId = params?.id;

    if (!body?.data || !teamId) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: `Required team data missing! => ${
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
        .update({
          tableName: "teams",
          data: {
            metadata: JSON.stringify(body.data),
          },
          where: {
            conditions: ["id = ?1"],
            params: [teamId],
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
          error: `An error occurred when trying to update team data. ${
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
