import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "TradingView Strategy for Small Gains",
    prompt: "Create a TradingView trading strategy focused on multiple small profitable trades rather than large risky positions. The strategy should be based on precise calculations and research.",
    icon: "chart",
  },
  {
    label: "Risk Management",
    prompt: "How should I manage risk when focusing on small, frequent gains in trading?",
    icon: "lifesaver",
  },
  {
    label: "Technical Indicators",
    prompt: "What technical indicators work best for a strategy targeting many small profits?",
    icon: "analytics",
  },
  {
    label: "Entry & Exit Rules",
    prompt: "Help me define entry and exit rules for a high-frequency small-gain trading strategy",
    icon: "compass",
  },
];

export const PLACEHOLDER_INPUT = "Ask about trading strategies...";

export const GREETING = "Welcome! I can help you develop TradingView trading strategies focused on consistent small gains. How can I assist you?";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
      level: 1,
    },
  },
  radius: "round",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
