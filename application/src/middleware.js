import { NextResponse } from "next/server";

const allowedOrigins = ["mcggesports.id"];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Y, Access-X, X-Access-Y, x-Access-X,cache-control, pragma, expires ",
};

export function middleware(request) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  // const isAllowedOrigin = allowedOrigins.includes(origin);
  const isAllowedOrigin = true;

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
