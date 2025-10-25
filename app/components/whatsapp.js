"use client";
import { useState } from "react";

export default function WhatsAppSender() {
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);

  async function sendMessage() {
    const res = await fetch("/api/whatsapp1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, text }),
    });
    const data = await res.json();
    setResponse(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Send WhatsApp Message</h1>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Phone number (e.g. 977980245698)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Message text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Send Message
      </button>

      {response && (
        <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
