import { NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

/* ✅ STEP 1: Webhook Verification (GET) */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified successfully!");
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Verification failed", { status: 403 });
  }
}

/* ✅ STEP 2: Handle Incoming Messages (POST) */
export async function POST(req) {
  try {
    const body = await req.json();

    if (body.object === "page") {
      for (const entry of body.entry) {
        const event = entry.messaging[0];
        const senderId = event.sender.id;
        const message = event.message?.text;

        if (message) {
          console.log("💬 Received message:", message);

          // 🧠 Generate AI response from Gemini
          const prompt = `
         imagine you are an asistant of a tution center  ${message}"
          `;

          const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          });

          // Gemini returns text in .response.text() (sometimes .text)
          const reply =
            result.response?.text?.() ||
            result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "hello can you send me the prefered location , grade of student and any more details that .";

          console.log("🤖 Reply:", reply);

          // 📤 Send reply back to Messenger
          await axios.post(
            `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
            {
              recipient: { id: senderId },
              message: { text: reply },
            }
          );
        }
      }

      return NextResponse.json({ status: "ok" });
    } else {
      return NextResponse.json({ status: "ignored" });
    }
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return new Response("Error", { status: 500 });
  }
}
