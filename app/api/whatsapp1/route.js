import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { to, text } = await request.json();

    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID; // from Meta dashboard
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to, // e.g. "977980245698"
          type: "text",
          text: { body: text },
        }),
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
