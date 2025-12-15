export const runtime = "edge";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

// Whitelist of allowed Perplexity models
const ALLOWED_MODELS = [
  "llama-3.1-sonar-small-128k-online",
  "llama-3.1-sonar-large-128k-online",
  "llama-3.1-sonar-huge-128k-online",
  "llama-3.1-sonar-small-128k-chat",
  "llama-3.1-sonar-large-128k-chat",
];

const DEFAULT_MODEL = "llama-3.1-sonar-small-128k-online";

export async function POST(request: Request): Promise<Response> {
  try {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "Missing PERPLEXITY_API_KEY environment variable",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = (await request.json()) as ChatRequest;
    const requestedModel = process.env.PERPLEXITY_MODEL || DEFAULT_MODEL;
    
    // Validate model against whitelist
    const model = ALLOWED_MODELS.includes(requestedModel)
      ? requestedModel
      : DEFAULT_MODEL;

    // Add system message for trading strategy focus
    const messages: Message[] = [
      {
        role: "system",
        content: "You are a trading strategy expert specializing in TradingView strategies. Focus on creating strategies with multiple small profitable trades rather than large risky positions. Provide precise calculations and research-backed recommendations.",
      },
      ...body.messages,
    ];

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Perplexity API error:", error);
      return new Response(
        JSON.stringify({
          error: `Perplexity API error: ${response.statusText}`,
          details: error,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
