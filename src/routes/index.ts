import { cors } from "itty-router";
import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import {
  authenticateUser,
  AuthLogin,
  AuthRegister,
  AuthLogout,
  AuthChangePassword,
  AuthRefreshToken,
} from "../auth";

const { preflight } = cors();

export const router = OpenAPIRouter({
  schema: {
    info: {
      title: "Authentication using D1",
      version: "1.0",
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  docs_url: "/",
});

// embed preflight upstream to handle all OPTIONS requests
router.all("*", preflight);

router.registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
});

// 1. Endpoints that don't require Auth
router.post("/api/auth/register", AuthRegister);
router.post("/api/auth/login", AuthLogin);
router.post("/api/auth/refresh-token", AuthRefreshToken);

// 2. Authentication middleware
router.all("/api/*", authenticateUser);

router.post("/api/auth/logout", AuthLogout);
router.post("/api/auth/changepassword", AuthChangePassword);

// 404 for everything else
router.all("*", () =>
  Response.json(
    {
      success: false,
      error: "Route not found",
    },
    { status: 404 }
  )
);
