import { NEYA_SYSTEM_PROMPT } from "./prompt";
import { generateResponse } from "./llm";

export async function runAgent(args: { message: string }): Promise<{ reply: string }> {
  const userMessage = args.message.trim();

  const { text } = await generateResponse({
    system: NEYA_SYSTEM_PROMPT,
    user: userMessage,
  });

  const reply = text.trim() || "Sorry — I wasn’t able to generate a response.";
  return { reply };
}
