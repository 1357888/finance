const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const fs = require("fs");
const path = require("path");

// Manually parse .env.local to avoid needing any dependencies
let key = process.env.GROQ_API_KEY;
try {
  const envPath = path.join(__dirname, ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/^GROQ_API_KEY\s*=\s*(.*)$/m);
    if (match && match[1]) {
      key = match[1].trim();
    }
  }
} catch (e) {
  console.log("Note: Could not read .env.local file directly, falling back to process.env");
}

if (!key || key.startsWith("YOUR_")) {
  console.error("ERROR: GROQ_API_KEY is not set or is still the placeholder in .env.local!");
  process.exit(1);
}

console.log("Using API key:", key.substring(0, 10) + "..." + key.substring(key.length - 4));

async function test() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: "Hello, say 'API works!'" },
        ],
        max_tokens: 100,
      }),
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`ERROR: Groq API returned status ${res.status}:`, errorBody);
      process.exit(1);
    }

    const data = await res.json();
    console.log("SUCCESS! Groq API Response:", data.choices[0].message.content);
  } catch (err) {
    clearTimeout(timeoutId);
    console.error("ERROR: Fetch failed:", err.message);
  }
}

test();
