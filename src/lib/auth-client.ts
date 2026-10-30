"use client";
import { createAuthClient } from "better-auth/react";
import { routes } from "@/constants/routes";
export const authClient = createAuthClient({ basePath: routes.auth });
