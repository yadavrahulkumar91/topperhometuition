// app/api/whatsapp/route.js
import { NextResponse } from "next/server";
import axios from "axios";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

/* ✅ STEP 1: Verify Webhook */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Verification failed", { status: 403 });
  }
}

/* ✅ STEP 2: Handle Incoming WhatsApp Messages */
export async function POST(req) {
  const body = await req.json();
  console.log("📩 Incoming WhatsApp Message:", JSON.stringify(body, null, 2));

  if (body.object) {
    const messages = body.entry?.[0]?.changes?.[0]?.value?.messages || [];
    for (const msg of messages) {
      const from = msg.from; // phone number
      const text = msg.text?.body;

      if (text) {
        console.log(`💬 Message from ${from}: ${text}`);

        // Create AI or rule-based reply here
        const reply = `Namaste! 🙏 Thank you for contacting Topper Home Tuition.
Please share:
1️⃣ Location  
2️⃣ Student grade  
3️⃣ Preferred subjects  
Or call 980245698 for more info.`;

        // 📤 Send reply back
        await axios.post(
          `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
          {
            messaging_product: "whatsapp",
            to: from,
            text: { body: reply },
          },
          {
            headers: {
              Authorization: `Bearer ${WHATSAPP_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
    return NextResponse.json({ status: "ok" });
  }
  return NextResponse.json({ status: "ignored" });
}
