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
import { GetTeamData } from "endpoints/teams/getTeam";
import { PostTeamData } from "endpoints/teams/createTeam";
import { DeleteTeamData } from "endpoints/teams/deleteTeam";
import { UpdateTeamData } from "endpoints/teams/updateTeam";
import { PostSquadData } from "endpoints/teams/squad/createSquad";
import { GetSquadData } from "endpoints/teams/squad/getSquad";
import { GetTeamReports } from "endpoints/teams/reports/getTeamReports";

import { GetPlayerReports } from "endpoints/players/getPlayerReports";
import { PostPlayerReports } from "endpoints/players/createPlayerReports";

const { preflight } = cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowMethods: "*",
  maxAge: 84600,
});

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
router.options("*", preflight);

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

/* ## TEAMS ## */
router.post("/api/v1/teams", PostTeamData);
router.get("/api/v1/teams/:id", GetTeamData);
router.delete("/api/v1/teams/:id", DeleteTeamData);
router.patch("/api/v1/teams/:id", UpdateTeamData);

/* ### TEAMS/REPORTS ### */
router.get("/api/v1/teams/:id/reports/", GetTeamReports);

/* ### TEAMS/SQUAD ### */
router.post("/api/v1/teams/:id/squad/", PostSquadData);
router.get("/api/v1/teams/:id/squad/", GetSquadData);

/* ## PLAYERS ## */
router.post("/api/v1/players/:id/reports", PostPlayerReports);
router.get("/api/v1/players/:id/reports", GetPlayerReports);

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
