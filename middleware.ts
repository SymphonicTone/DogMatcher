import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname === "/search") {
  //   const token = request.cookies.get("fetch-access-token");
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  //   const res = await fetch("https://your-api.com/validate-token", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   if (res.status !== 200) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/search"],
};
