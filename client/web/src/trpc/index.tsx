"use client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@repo/server-app";

export const trpcReact = createTRPCReact<AppRouter>();
