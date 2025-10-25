// app/api/facebook/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message } = await request.json();

    const pageId = "507348039125131"; // your page ID
    const accessToken = process.env.FB_PAGE_ACCESS_TOKEN; // store in .env file

    const res = await fetch(`https://graph.facebook.com/${pageId}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        access_token: accessToken,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
