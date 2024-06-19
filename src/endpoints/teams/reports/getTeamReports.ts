import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "types/env";
import { IRequest } from "itty-router";
import { Context } from "interfaces/context";

export class GetTeamReports extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Training reports"],
    summary: "Get team's training reports",
    parameters: {
      id: { type: z.number(), location: "path" },
    },
    responses: {
      "200": {
        description: "Returns training",
        schema: { training: z.array(z.record(z.string(), z.any())) },
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

    const trainingMetadata = await context.qb
      .fetchAll({
        tableName: "training_reports",
        fields: ["metadata"],
        where: { conditions: ["team_id = ?1"], params: [teamId] },
        groupBy: "player_id",
      })
      .execute();

    if (!trainingMetadata.results?.length) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Training data not found",
          message: trainingMetadata?.results?.toString(),
        }),
        {
          status: 404,
        }
      );
    }

    const trainingData = [];

    console.log("trainingMetadata.results: ", trainingMetadata.results);

    for (const result of trainingMetadata.results) {
      trainingData.push(JSON.parse(result.metadata as string));
    }

    return new Response(JSON.stringify(trainingData), {
      status: 200,
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  }
}
