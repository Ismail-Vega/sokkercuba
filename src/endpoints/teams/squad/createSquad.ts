import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "types/env";
import { IRequest } from "itty-router";
import { Context } from "interfaces/context";

export class PostSquadData extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Squads"],
    summary: "Insert Squad data",
    parameters: {
      id: { type: z.number().describe("Team id"), location: "path" },
    },
    requestBody: {
      data: z.array(z.record(z.string(), z.any())),
    },
    responses: {
      "200": {
        description: "Returns success",
        schema: {
          success: Boolean,
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
    const { params } = request;
    const teamId = params?.id;

    if (!body?.data || !teamId) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: `Required data missing! => ${
            !teamId ? "Team Id." : "body data."
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
      const inserts = [];

      for (let i = 0; i < body.data.length; i++) {
        const playerId = body.data[i].id;

        inserts.push(
          context.qb
            .insert({
              tableName: "players",
              data: {
                id: playerId,
                active: "true",
                team_id: teamId,
                metadata: JSON.stringify(body.data[i]),
              },
            })
            .execute()
        );
      }

      await Promise.all(inserts);

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
          error: `An error occurred when trying to create Squad data. ${
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
