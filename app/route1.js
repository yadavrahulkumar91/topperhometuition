// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import axios from "axios";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// /* ✅ STEP 1: Verify webhook (GET request) */
// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const mode = searchParams.get("hub.mode");
//   const token = searchParams.get("hub.verify_token");
//   const challenge = searchParams.get("hub.challenge");

//   if (mode === "subscribe" && token === VERIFY_TOKEN) {
//     console.log("✅ Webhook verified successfully!");
//     return new Response(challenge, { status: 200 });
//   } else {
//     return new Response("Verification failed", { status: 403 });
//   }
// }

// /* ✅ STEP 2: Handle messages (POST request) */
// export async function POST(req) {
//   try {
//     const body = await req.json();

//     if (body.object === "page") {
//       for (const entry of body.entry) {
//         const event = entry.messaging[0];
//         const senderId = event.sender.id;
//         const message = event.message?.text;

//         if (message) {
//           console.log("💬 Received message:", message);

//           // Get AI reply from OpenAI
//           const aiResponse = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages: [
//               {
//                 role: "system",
//                 content: `
//                 You are "Topper Home Tuition Assistant".
//                 Respond politely to parents asking about tuition, fees, subjects, or scheduling demos.
//                 Keep replies short and clear.
//                 `,
//               },
//               { role: "user", content: message },
//             ],
//           });

//           const reply = aiResponse.choices[0].message.content.trim();

//           // Send reply back to Messenger
//           await axios.post(
//             `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
//             {
//               recipient: { id: senderId },
//               message: { text: reply },
//             }
//           );
//         }
//       }

//       return NextResponse.json({ status: "ok" });
//     } else {
//       return NextResponse.json({ status: "ignored" });
//     }
//   } catch (err) {
//     console.error("❌ Webhook error:", err);
//     return new Response("Error", { status: 500 });
//   }
// }
