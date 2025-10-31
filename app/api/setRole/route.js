import { NextResponse } from "next/server";
import { admin } from "@/firebase/admin";

export async function POST(req) {
  try {
    const { uid, role } = await req.json();

    if (!uid || !role) {
      return NextResponse.json(
        { error: "Missing uid or role" },
        { status: 400 }
      );
    }

    await admin.auth().setCustomUserClaims(uid, { role });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error setting role:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
