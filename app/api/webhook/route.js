// app/api/webhook/route.js

import { NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import db from "@/firebase/firestore.js";
import { adminDb } from "@/firebase/admin";
// import { adminDb } from "../../firebase/admin.js";



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





export async function POST(req) {
  
  try {
    const body = await req.json();
    console.log("📩 Webhook event received:", JSON.stringify(body, null, 2));

    if (body.object === "page") {
      for (const entry of body.entry) {
        const event = entry.messaging[0];
        const senderId = event.sender.id;
        const message = event.message?.text;

        if (message) {
          console.log("💬 Received message:", message, "from:", senderId);

          /* 🗂️ STEP 1: Fetch conversation from Firestore */
          const conversationRef = adminDb
            .collection("conversations")
            .doc(senderId);
          const conversationDoc = await conversationRef.get();

          let messages = [];

          if (conversationDoc.exists) {
            messages = conversationDoc.data().messages || [];
          }

          // Add user message to history
          messages.push({
            role: "user",
            text: message,
            timestamp: new Date().toISOString(),
          });

          // Keep only last 10 messages to avoid token limits
          if (messages.length > 20) {
            messages = messages.slice(-10);
          }

          /* 🧠 STEP 2: Build conversation context */
          const conversationHistory = messages
            .map(
              (msg) =>
                `${msg.role === "user" ? "User" : "Assistant"}: ${msg.text}`
            )
            .join("\n");

          const prompt = `
You are "Topper Home Tuition Assistant", an AI managing tuition-related Facebook chats.
Below is the full chat history between user and you.
Respond naturally based on full context.

Chat History:
${conversationHistory}

Rules:
1. Identify if it's a parent (asking tuition) or tutor (asking vacancy/job)they come with the queries like "is the vacancy available ? hello can i teach  ".
2. Tutors → share WhatsApp invitation:
📢 Invitation for Teachers
Dear Teacher,
we regularly udate all the home tution vacancies in our whatsapp group for teachers.You can apply to the vacancies there directly by sending us your latest updated CV because it is asked by the parents for the vancacy in the whatsapp number 9700218347
We warmly invite you to join our official WhatsApp group "Topper Home Tuition Center Faculty Members" 📚
🔍 Get regular updates on home tuition vacancies for various subjects and grades across different locations of Kathmandu Valley.
👉 Join the group now: https://chat.whatsapp.com/GwfibUpx6An8Vx6kFgUWNW?mode=ac_t
📘 Follow our Facebook page: https://www.facebook.com/profile.php?id=61570084723558
🌐 Visit our website: https://topperhometuition.vercel.app/
3. Parents → greet with "Namaste" for start of conversation and ask for location, grade, and subjects. Greeting them should be limited for the first message only. from the second text just reply them directly asking for the details. most parents will message you like "i need a tutor for my child " or  "what is the fees?". .so wait untill they provide you the details of the subject and grade  .after they provide you the details politely tell them abot our fees structure 
class 1 to 5 =7,000-5,000 per month negotiable depending upon the qualification and experience of the tutor.convince them to hire experienced tutors for better results which charge more. if they negotiate or ask discount tell them to provide their phone number so that our team can call them and convince them better.
class 6 to 8 =10,000-8,000 per month
class 9 to 10 =15,000-10,000 per month
class 11 to 12 =12,000-20,000 per month
A levels (AS and A2) = 20,000-30,000 per month or 1,000-1,500 per hour
after providing the fee structure always tell them that the fees may vary depending upon the tutor's qualification and experience but still we will try to  find the best teacher within their budget 
and tution for the competitive exams like SEE , NEB board exams , CEE , medical entrance etc will be 15,000 -25,000 per month .

ask them to send their number so that we can talk.
4. Always be polite, short, and helpful but in human tone
5. If unclear → ask them to leave their contact number. We will contact them. Or they can contact whatsapp 9700218347/9749868692 for more details.
Most important thing is if you don't understand anything or  any message that is completely out of the instructions just dont reply ,nothing all .better to be direct and as human as possible sometiimes you may get meddages in nepali language also so try to understand and reply them in nepali ,only if possible.generally parents wont reply you all the information in one go so after getting one information send them fee and as the followup ask them for the other details that they havent provided yet.\
dont greet them twice, talk directly and answer their queries in a human tone.
Respond to the latest user message naturally:`;

          /* 💡 STEP 3: Get Gemini Response */
          const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          });

          const reply =
            result.text ||
            "Namaste! Could you please share your location, grade, and preferred subjects?";

          console.log("🤖 Reply:", reply);

          // Add assistant reply to history
          messages.push({
            role: "assistant",
            text: reply,
            timestamp: new Date().toISOString(),
          });

          /* 💾 STEP 4: Save conversation to Firestore */
          await conversationRef.set({
            userId: senderId,
            messages: messages,
            updatedAt: new Date().toISOString(),
            createdAt: conversationDoc.exists
              ? conversationDoc.data().createdAt
              : new Date().toISOString(),
          });

          console.log("✅ Conversation saved to Firestore");

          /* 📤 STEP 5: Send reply to Messenger */
          await axios.post(
            `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
            {
              recipient: { id: senderId },
              message: { text: reply },
            }
          );

          console.log("✅ Message sent to user");
        }
      }

      return NextResponse.json({ status: "ok" });
    } else {
      return NextResponse.json({ status: "ignored" });
    }
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

