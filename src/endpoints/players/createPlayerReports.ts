import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "types/env";
import { IRequest } from "itty-router";
import { Context } from "interfaces/context";

export class PostPlayerReports extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Training reports"],
    summary: "Insert player training report",
    parameters: {
      id: { type: z.number(), location: "path" },
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
      "400": {
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
    const { body } = data;
    const { params } = request;
    const playerId = params?.id;
    const teamId = env?.userSession.user_id;

    if (!body?.data?.reports || !playerId) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: `Required data missing! => ${
            !playerId ? "Player Id." : "body data."
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

      for (const report of body.data.reports) {
        const week = report.week;

        inserts.push(
          context.qb
            .insert({
              tableName: "training_reports",
              data: {
                week,
                player_id: playerId,
                team_id: teamId as string,
                metadata: JSON.stringify(report),
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
          message: e.message || e,
          error: "An error occurred when trying to create training report",
        }),
        {
          status: 500,
        }
      );
    }
  }
}
