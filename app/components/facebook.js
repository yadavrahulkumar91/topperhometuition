"use client";
import { useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);

  async function handlePost() {
    const res = await fetch("/api/facebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Post to Facebook Page</h1>
      <textarea
        className="border p-2 w-full mb-2"
        rows={3}
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post
      </button>

      {response && (
        <pre className="mt-4 p-2 bg-gray-100 border rounded text-sm">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
