import { NextResponse } from "next/server";
import { bucket } from "../../firebase/admin";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Build a safe filename
    const safeName = (file.name || "upload").replace(/\s+/g, "_");
    const filename = `profile-pictures/${Date.now()}_${safeName}`;

    const fileRef = bucket.file(filename);

    // Save the file to the bucket
    await fileRef.save(buffer, {
      metadata: { contentType: file.type || "application/octet-stream" },
      resumable: false,
    });

    // Create a signed URL so the client can access it without changing bucket policy
    const [signedUrl] = await fileRef.getSignedUrl({
      action: "read",
      // Very long-lived URL; adjust expiration per security requirements
      expires: "03-09-2491",
    });

    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
