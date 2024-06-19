import { Email, OpenAPIRoute } from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Env } from "../types/env";
import { Context } from "../interfaces/context";

async function hashPassword(password: string, salt: string): Promise<string> {
  const utf8 = new TextEncoder().encode(`${salt}:${password}`);

  const hashBuffer = await crypto.subtle.digest({ name: "SHA-256" }, utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
}

export class AuthRegister extends OpenAPIRoute {
  static schema = {
    tags: ["Auth"],
    summary: "Register user",
    requestBody: {
      name: String,
      email: new Email(),
      password: z.string().min(8).max(24),
    },
    responses: {
      "200": {
        description: "Successful response",
        schema: {
          success: Boolean,
          result: {
            user: {
              email: String,
              name: String,
            },
          },
        },
      },
      "400": {
        description: "Error",
        schema: {
          success: Boolean,
          error: String,
          message: String,
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
    let user;

    try {
      user = await context.qb
        .insert({
          tableName: "users",
          data: {
            email: data.body.email,
            name: data.body.name,
            password: await hashPassword(data.body.password, env.SALT_TOKEN),
          },
          returning: "*",
        })
        .execute();
    } catch (e) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: "User with that email already exists",
          message: e?.message || e,
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 400,
        }
      );
    }

    return {
      success: true,
      result: {
        user: {
          email: user.results.email,
          name: user.results.name,
        },
      },
    };
  }
}

export class AuthLogin extends OpenAPIRoute {
  static schema = {
    tags: ["Auth"],
    summary: "Login user",
    requestBody: {
      email: new Email(),
      password: z.string().min(8).max(24),
    },
    responses: {
      "200": {
        description: "Successful response",
        schema: {
          success: Boolean,
          result: {
            accessToken: String,
            expiresAt: String,
          },
        },
      },
      "400": {
        description: "Error",
        schema: {
          success: Boolean,
          error: String,
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
    const user = await context.qb
      .fetchOne({
        tableName: "users",
        fields: "*",
        where: {
          conditions: ["email = ?1", "password = ?2"],
          params: [
            data.body.email,
            await hashPassword(data.body.password, env.SALT_TOKEN),
          ],
        },
      })
      .execute();

    if (!user.results) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: "User or password was incorrect. Please try again.",
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 400,
        }
      );
    }

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 7);

    const refreshToken = await hashPassword(
      `refresh-token-${new Date().getTime()}`,
      env.SALT_TOKEN
    );

    const accessToken = await hashPassword(
      `${new Date().getTime()}`,
      env.SALT_TOKEN
    );

    const session = await context.qb
      .insert({
        tableName: "users_sessions",
        data: {
          user_id: user.results.id as number,
          token: accessToken,
          refresh_token: refreshToken,
          expires_at: expiration.toISOString(),
          last_login: new Date().toISOString(),
        },
        returning: "*",
      })
      .execute();

    const accessTokenExpiration = new Date();
    accessTokenExpiration.setMinutes(accessTokenExpiration.getMinutes() + 15);

    return new Response(
      JSON.stringify({
        success: true,
        result: {
          accessToken,
          expiresAt: accessTokenExpiration.toISOString(),
        },
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${
            60 * 60 * 24 * 7
          }`,
        },
      }
    );
  }
}

export class AuthRefreshToken extends OpenAPIRoute {
  static schema = {
    tags: ["Auth"],
    summary: "Refresh access token",
    responses: {
      "200": {
        description: "Successful response",
        schema: {
          success: Boolean,
          result: {
            accessToken: String,
            expiresAt: String,
          },
        },
      },
      "401": {
        description: "Unauthorized",
        schema: {
          success: Boolean,
          error: String,
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
    const cookieHeader = request.headers.get("Cookie");
    const cookies = new Map(
      cookieHeader
        ?.split(";")
        .map((c) => c.trim().split("=") as [string, string])
        .filter((pair) => pair.length === 2)
    );
    const refreshToken = cookies.get("refreshToken");

    if (!refreshToken) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: "No valid refresh token provided",
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 401,
        }
      );
    }

    const session = await context.qb
      .fetchOne({
        tableName: "users_sessions",
        fields: "*",
        where: {
          conditions: ["refresh_token = ?1", "expires_at > ?2"],
          params: [refreshToken, new Date().getTime()],
        },
      })
      .execute();

    if (!session.results) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: "Invalid or expired refresh token",
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 401,
        }
      );
    }

    const accessToken = await hashPassword(
      `${new Date().getTime()}`,
      env.SALT_TOKEN
    );

    const accessTokenExpiration = new Date();
    accessTokenExpiration.setMinutes(accessTokenExpiration.getMinutes() + 15);

    const currentTime = new Date().toISOString();

    // Update users_sessions table for the user_id
    await context.qb
      .update({
        tableName: "users_sessions",
        data: {
          token: accessToken,
          last_login: currentTime,
        },
        where: {
          conditions: ["user_id = ?1"],
          params: [session.results.user_id as number],
        },
      })
      .execute();

    return new Response(
      JSON.stringify({
        success: true,
        result: {
          accessToken,
          expiresAt: accessTokenExpiration.toISOString(),
        },
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
  }
}

export class AuthLogout extends OpenAPIRoute {
  static schema = {
    tags: ["Auth"],
    summary: "Logout user",
    responses: {
      "200": {
        description: "Successful logout",
        schema: {
          success: Boolean,
        },
      },
      "400": {
        description: "Error",
        schema: {
          success: Boolean,
          error: String,
        },
      },
    },
  };

  async handle(request: Request, env: Env, context: Context) {
    // Ensure authenticateUser middleware has been run
    if (!env.userSession) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: "User not authenticated",
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 400,
        }
      );
    }

    const userSession = env.userSession;

    // Invalidate the session in the database
    await context.qb
      .delete({
        tableName: "users_sessions",
        where: {
          conditions: ["user_id = ?1 AND token = ?2"],
          params: [userSession.user_id as number, userSession.token as string],
        },
      })
      .execute();

    // Remove the refresh token cookie
    const response = new Response(JSON.stringify({ success: true }), {
      headers: {
        "Set-Cookie":
          "refreshToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0",
        "content-type": "application/json;charset=UTF-8",
      },
      status: 200,
    });

    // Clear the user session from env
    delete env.userSession;

    return response;
  }
}

export class AuthChangePassword extends OpenAPIRoute {
  static schema = {
    tags: ["Auth"],
    summary: "Change user password",
    requestBody: {
      old_password: z.string().min(8).max(24),
      new_password: z.string().min(8).max(24),
    },
    responses: {
      "200": {
        description: "Successful response",
        schema: {
          success: Boolean,
        },
      },
      "400": {
        description: "Error",
        schema: {
          success: Boolean,
          error: String,
        },
      },
      "401": {
        description: "Unauthorized",
        schema: {
          success: Boolean,
          error: String,
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
    const token = getBearer(request);

    if (!token) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: "No authentication token provided",
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 401,
        }
      );
    }

    const session = await context.qb
      .fetchOne({
        tableName: "users_sessions",
        fields: "*",
        where: {
          conditions: ["token = ?1", "expires_at > ?2"],
          params: [token, new Date().getTime()],
        },
      })
      .execute();

    if (!session.results) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: "Invalid or expired session token",
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 401,
        }
      );
    }

    const user = await context.qb
      .fetchOne({
        tableName: "users",
        fields: "*",
        where: {
          conditions: ["id = ?1"],
          params: [session.results.user_id as number],
        },
      })
      .execute();

    if (
      user.results.password !==
      (await hashPassword(data.body.old_password, env.SALT_TOKEN))
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: "Incorrect old password",
        }),
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          status: 400,
        }
      );
    }

    await context.qb
      .update({
        tableName: "users",
        data: {
          password: await hashPassword(data.body.new_password, env.SALT_TOKEN),
        },
        where: {
          conditions: ["id = ?1"],
          params: [session.results.user_id as number],
        },
      })
      .execute();

    return {
      success: true,
    };
  }
}

export function getBearer(request: Request): null | string {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || authHeader.substring(0, 6) !== "Bearer") {
    return null;
  }
  return authHeader.substring(6).trim();
}

export async function authenticateUser(
  request: Request,
  env: Env,
  context: Context
) {
  const token = getBearer(request);
  if (!token) {
    return new Response(
      JSON.stringify({
        success: false,
        errors: "Authentication error: No token provided",
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        status: 401,
      }
    );
  }

  const session = await context.qb
    .fetchOne({
      tableName: "users_sessions",
      fields: "*",
      where: {
        conditions: ["token = ?1", "expires_at > ?2"],
        params: [token, new Date().getTime()],
      },
    })
    .execute();

  if (!session.results) {
    return new Response(
      JSON.stringify({
        success: false,
        errors: "Authentication error: Invalid or expired token",
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        status: 401,
      }
    );
  }

  // Set the session information on env or context
  env.userSession = session.results;
}
