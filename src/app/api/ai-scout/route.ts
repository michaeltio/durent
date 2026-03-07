import { NextRequest } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  BaseMessage,
} from "@langchain/core/messages";

// Initialize the model
const model = new ChatGoogleGenerativeAI({
  model: "models/gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.7,
});

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build conversation context
    const messages: BaseMessage[] = [
      new SystemMessage(`You are an AI Location Scout assistant for a shooting location rental platform. 
Your job is to help filmmakers and content creators find the perfect shooting locations based on their script descriptions.

When analyzing scripts, consider:
- Scene type (interior/exterior)
- Time of day (day/night)
- Atmosphere and mood
- Required space and setting
- Special requirements (e.g., chandelier, mansion, beach, urban, etc.)

Provide thoughtful recommendations and ask clarifying questions when needed to better understand their requirements.
Be helpful, professional, and enthusiastic about finding the perfect location.`),
    ];

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: { role: string; content: string }) => {
        if (msg.role === "user") {
          messages.push(new HumanMessage(msg.content));
        } else if (msg.role === "assistant") {
          messages.push(new AIMessage(msg.content));
        }
      });
    }

    // Add current message
    messages.push(new HumanMessage(message));

    // Get response from Gemini
    const response = await model.invoke(messages);

    return new Response(
      JSON.stringify({
        message: response.content,
        success: true,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("AI Scout error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
