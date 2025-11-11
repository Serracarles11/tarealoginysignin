// lib/supabase/server.ts
import { cookies } from "next/headers"
import {
  createServerComponentClient,
  createRouteHandlerClient,
  createMiddlewareClient,
} from "@supabase/auth-helpers-nextjs"

export const serverComponentSupabase = () =>
  createServerComponentClient({ cookies })

export const routeHandlerSupabase = () =>
  createRouteHandlerClient({ cookies })

export const middlewareSupabase = (req: any, res: any) =>
  createMiddlewareClient({ req, res })
