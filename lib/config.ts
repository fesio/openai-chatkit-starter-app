export type StartScreenPrompt = {
  label: string;
  prompt: string;
  icon?: string;
};

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
