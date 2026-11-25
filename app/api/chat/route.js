import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) return NextResponse.json({ error: "No messages supplied." }, { status: 400 });
    const key = process.env.OPENAI_API_KEY;
    if (!key) return NextResponse.json({ error: "Chat generation is not configured. Add OPENAI_API_KEY in Vercel environment variables." }, { status: 503 });
    const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
    const endpoint = base.endsWith("/chat/completions") ? base : base + "/chat/completions";
    const character = body.character || {};
    const styles = {
      "PipSqueak 2": "Natural, emotionally responsive conversation. Keep the character voice consistent; balance dialogue and subtle action.",
      "PipSqueak 2 · Rawr": "Playful, energetic, chatty and dramatically expressive while staying in character.",
      "Deepsqweak": "Immersive literary prose, psychological nuance, subtext, atmosphere and dramatic pacing."
    };
    const modes = {
      Normal: "Use a balanced response length.",
      Extended: "Write a more substantial, immersive reply when appropriate.",
      Dramatic: "Emphasize tension, emotional beats and dramatic pacing.",
      "Deep Immersion": "Stay deeply immersed in the scene, using sensory detail and continuity.",
      Cinematic: "Use cinematic pacing, visual details and expressive dialogue.",
      Concise: "Keep the reply concise, usually one or two short paragraphs."
    };
    const system = [
      "You are roleplaying as " + (character.name || "the character") + ". Stay in character. This is a fictional conversation.",
      character.personality ? "CHARACTER DEFINITION:\n" + character.personality : "",
      character.description ? "DESCRIPTION:\n" + character.description : "",
      "PROMPT STYLE: " + (styles[body.style] || styles["PipSqueak 2"]),
      "RESPONSE MODE: " + (modes[body.mode] || modes.Normal),
      "Do not write the user's actions, thoughts or dialogue. Preserve continuity. Avoid out-of-character explanations unless asked."
    ].filter(Boolean).join("\n\n");
    const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + key };
    if (process.env.OPENAI_EXTRA_HEADERS) {
      try {
        const extra = JSON.parse(process.env.OPENAI_EXTRA_HEADERS);
        for (const [name, value] of Object.entries(extra)) {
          if (typeof value === "string" && !/authorization|host|content-length/i.test(name)) headers[name] = value;
        }
      } catch {}
    }
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers,
      signal: AbortSignal.timeout(Number(process.env.OPENAI_TIMEOUT_MS) || 90000),
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [{ role: "system", content: system }, ...messages.slice(-30).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content || "") }))],
        temperature: Math.max(0, Math.min(2, Number(body.temperature) || 0.9)),
        top_p: 0.95,
        max_tokens: body.mode === "Concise" ? 450 : body.mode === "Extended" ? 1800 : 1000,
        stream: false
      })
    });
    const raw = await upstream.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = {}; }
    if (!upstream.ok) return NextResponse.json({ error: data.error?.message || raw.slice(0, 500) || "Model provider error." }, { status: upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502 });
    const content = data.choices?.[0]?.message?.content;
    if (!content) return NextResponse.json({ error: "The model returned an empty response." }, { status: 502 });
    return NextResponse.json({ content });
  } catch (error) {
    const message = error?.name === "TimeoutError" ? "The model provider request timed out." : error?.message || "Unable to process chat request.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
