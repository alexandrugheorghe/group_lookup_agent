import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

type LlmProvider = "gemini" | "openai";

export type LlmTextRequest = {
  system: string;
  user: string;
  model?: string;
};

export type LlmTextResponse = {
  text: string;
  model: string;
  provider: LlmProvider;
};

function getProviderAndKey(): { provider: LlmProvider; apiKey: string } {
  // Prefer Gemini if multiple keys are present.
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (geminiKey) return { provider: "gemini", apiKey: geminiKey };

  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  if (openaiKey) return { provider: "openai", apiKey: openaiKey };

  throw new Error(
    "Missing API key. Create a `.env.local` (see `.env.example`) and set either GEMINI_API_KEY=... or OPENAI_API_KEY=....",
  );
}

export async function generateResponse(req: LlmTextRequest): Promise<LlmTextResponse> {
  const { provider, apiKey } = getProviderAndKey();
  const modelName = req.model ?? (provider === "gemini" ? "gemini-2.5-flash" : "gpt-4o-mini");

  const modelFactory =
    provider === "gemini"
      ? createGoogleGenerativeAI({ apiKey })
      : createOpenAI({ apiKey });

  const result = await generateText({
    model: modelFactory(modelName),
    system: req.system,
    prompt: req.user,
  });

  return { text: result.text, model: modelName, provider };
}


