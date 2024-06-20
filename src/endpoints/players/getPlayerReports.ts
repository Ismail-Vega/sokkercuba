import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "types/env";
import { IRequest } from "itty-router";
import { Context } from "interfaces/context";

export class GetPlayerReports extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Training reports"],
    summary: "Get player's training reports",
    parameters: {
      id: { type: z.number(), location: "path" },
    },
    responses: {
      "200": {
        description: "Returns player's training reports",
        schema: { training: z.array(z.record(z.string(), z.any())) },
      },
      "404": {
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
    const { params } = request;
    const playerId = params?.id;

    if (!playerId) {
      return new Response(
        JSON.stringify({
          error: "Required parameter playerId missing!",
        }),
        { status: 400 }
      );
    }

    const trainingMetadata = await context.qb
      .fetchAll({
        tableName: "training_reports",
        fields: ["metadata"],
        where: { conditions: ["player_id = ?1"], params: [playerId] },
      })
      .execute();

    if (!trainingMetadata.results?.length) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Training data not found",
        }),
        {
          status: 404,
        }
      );
    }

    const trainingData = [];

    for (const result of trainingMetadata.results) {
      trainingData.push(JSON.parse(result.metadata as string));
    }

    return new Response(
      JSON.stringify({ id: playerId, reports: trainingData }),
      {
        status: 200,
        headers: { "content-type": "application/json;charset=UTF-8" },
      }
    );
  }
}
