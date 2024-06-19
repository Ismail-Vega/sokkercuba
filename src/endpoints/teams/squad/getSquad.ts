import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "types/env";
import { IRequest } from "itty-router";
import { Context } from "interfaces/context";

export class GetSquadData extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Players"],
    summary: "Get all players from a team",
    parameters: {
      id: { type: z.number(), location: "path" },
    },
    responses: {
      "200": {
        description: "Returns squad",
        schema: { players: z.array(z.record(z.string(), z.any())) },
      },
      "404": {
        description: "Returns failed",
        schema: {
          success: Boolean,
          error: z.string(),
          message: z.string(),
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
    const { params } = request;
    const teamId = params?.id;

    if (!teamId) {
      return new Response(
        JSON.stringify({
          message: "Required parameter teamId missing!",
        }),
        { status: 400 }
      );
    }

    const squadMetadata = await context.qb
      .fetchAll({
        tableName: "players",
        fields: ["metadata"],
        where: { conditions: ["team_id = ?1"], params: [teamId] },
      })
      .execute();

    if (!squadMetadata.results?.length) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Team not found",
          message: squadMetadata?.results?.toString(),
        }),
        {
          status: 404,
        }
      );
    }

    const squadData = [];

    for (const result of squadMetadata.results) {
      squadData.push(JSON.parse(result.metadata as string));
    }

    return new Response(JSON.stringify(squadData), {
      status: 200,
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  }
}
