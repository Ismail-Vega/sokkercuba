import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Context } from "interfaces/context";
import { Env } from "types/env";
import { compressData } from "utils/dataCompression";

export class ItemCreate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Items"],
    summary: "Create a new Item",
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
          errors: String,
        },
      },
    },
  };

  async handle(
    request: Request,
    env: Env,
    context: Context,
    data: Record<string, any>
  ) {
    const { body } = data;
    const userSession = env.userSession;

    if (!body?.data) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: "Required body data missing!",
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 400,
        }
      );
    }

    const withCompression = await compressData(body.data);

    await context.qb
      .insert({
        tableName: "items",
        data: {
          user_id: userSession.user_id as number,
          value: withCompression.toString(),
        },
      })
      .execute();

    return {
      success: true,
    };
  }
}
