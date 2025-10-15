// import { NextResponse } from "next/server";
// import axios from "axios";
// import { GoogleGenAI } from "@google/genai";

// // Initialize Gemini client
// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_API_KEY,
// });

// const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// /* ✅ STEP 1: Webhook Verification (GET) */
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

// /* ✅ STEP 2: Handle Incoming Messages (POST) */
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("📩 Webhook event received:", JSON.stringify(body, null, 2))    ;
//     if (body.object === "page") {
//       for (const entry of body.entry) {
//         const event = entry.messaging[0];
//         const senderId = event.sender.id;
//         const message = event.message?.text;

//         if (message) {
//           console.log("💬 Received message:", message);

//           // 🧠 Generate AI response from Gemini
//           const prompt = `
//           imagine You are a asisstant of a facebook page that appoints teachers to the parents that need the home tution . your main aim is to collect the
//          following datas :
//          1. location :
//             2. grade of student :
//             3.  preferred subjects :
//            most of the messeges will be in nepali and  there will be two types of people messaging you
//             1. parents looking for tutors
//             2. tutors looking for students:

//             if they ask for any sort of vacancy or job related query identify it and a teacher and reply humbly to get connected to our whatsapp group for more details.
//           if they ask for any tution details for rate of the tution identify them as parents , greet them by saying namaste and ask them the above details .after their reply what ever details that
//           you get tell them to call in this number for more details or if you dont understand any message message them to contact the number for any
//           as "Topper Home Tuition Assistant".
//            reply politely to parents and in more human tone asking about tuition, fees, tutors, and scheduling demo classes.
//           Keep replies short, friendly, and professional.
//           Message: "${message}"
//           `;

//           const result = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//             // contents: `${prompt}`,
//           });

//           // Gemini returns text in .response.text() (sometimes .text)
//           const reply =
//             result.text ||
//             "hello can you send me the prefered location , grade of student and any more details that .";

//           console.log("🤖 Reply:", reply);

//           // 📤 Send reply back to Messenger
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




import { NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

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

export async function POST(req) {
  const body = await req.json();
  if (body.object !== "page") return NextResponse.json({ status: "ignored" });

  for (const entry of body.entry) {
    const event = entry.messaging[0];
    const senderId = event.sender.id;
    const message = event.message?.text;
    if (!message) continue;

    console.log("💬 Received:", message);

    // STEP 1: Find conversation with this user
    const convRes = await axios.get(
      `https://graph.facebook.com/v19.0/me/conversations?fields=participants&access_token=${PAGE_ACCESS_TOKEN}`
    );

    const conversation = convRes.data.data.find((c) =>
      c.participants.data.some((p) => p.id === senderId)
    );

    let contextMessages = [];
    if (conversation) {
      const convId = conversation.id;

      // STEP 2: Fetch last few messages
      const msgRes = await axios.get(
        `https://graph.facebook.com/v19.0/${convId}/messages?fields=message,from,created_time&limit=5&access_token=${PAGE_ACCESS_TOKEN}`
      );

      contextMessages = msgRes.data.data.reverse().map((m) => ({
        role: m.from.id === senderId ? "user" : "assistant",
        parts: [{ text: m.message }],
      }));
    }

    // STEP 3: Prepare prompt for Gemini
    const systemPrompt = `
You are "Topper Home Tuition Assistant", a polite and helpful page assistant for parents and tutors.
Follow these rules:
- Identify if the person is a tutor (asks about vacancy) or a parent (asks about tuition)
- Reply in short, friendly, Nepali or English depending on message
- Ask for: location, grade, and subjects
- Be humble and professional.
`;

    const conversationInput = [
      { role: "system", parts: [{ text: systemPrompt }] },
      ...contextMessages,
      { role: "user", parts: [{ text: message }] },
    ];

    // STEP 4: Generate Gemini reply
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversationInput,
    });

    const reply =
      result.text || "Namaste! Please tell me the location and grade.";
    console.log("🤖 Reply:", reply);

    // STEP 5: Send reply to Messenger
    await axios.post(
      `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        recipient: { id: senderId },
        message: { text: reply },
      }
    );
  }

  return NextResponse.json({ status: "ok" });
}
