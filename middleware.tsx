import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("Middleware started");

  let key: any = new TextEncoder().encode(process.env.JWT_SECRET);

  const tokenauthen: any = request.cookies.get('JWT')?.value;

  if (!tokenauthen) { return NextResponse.redirect(new URL("/login", request.url)); };

  if (tokenauthen) {
    try {
      const verified_jwt = await jwtVerify(tokenauthen, key)
      console.log(verified_jwt)
    }
    catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL("/", request.url))
    }

  }
};

// See "Matching Paths" below to learn more
export const config = { matcher: '/womens' }

