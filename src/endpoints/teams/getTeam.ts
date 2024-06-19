import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "types/env";
import { IRequest } from "itty-router";
import { Context } from "interfaces/context";

export class GetTeamData extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Teams"],
    summary: "Get an existing Team",
    parameters: {
      id: { type: z.number(), location: "path" },
    },
    responses: {
      "200": {
        description: "Returns team",
        schema: z.record(z.string(), z.any()),
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

    const teamMetadata = await context.qb
      .fetchOne({
        tableName: "teams",
        fields: ["metadata"],
        where: { conditions: ["id = ?1"], params: [teamId] },
      })
      .execute();

    if (!teamMetadata.results?.metadata) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Team not found",
          message: teamMetadata?.results?.toString(),
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(teamMetadata.results.metadata as string, {
      status: 200,
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  }
}
