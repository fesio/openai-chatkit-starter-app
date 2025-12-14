"use client";

import { useState, useRef, useEffect } from "react";
import { STARTER_PROMPTS, PLACEHOLDER_INPUT, GREETING } from "@/lib/config";
import type { ColorScheme } from "@/hooks/useColorScheme";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
}

type ChatPanelProps = {
  theme: ColorScheme;
};

export function ChatPanel({ theme }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
        throw new Error("Invalid response format from API");
      }
      
      if (!data.choices[0].message || !data.choices[0].message.content) {
        throw new Error("Missing message content in API response");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`relative pb-8 flex h-[90vh] w-full rounded-2xl flex-col overflow-hidden shadow-sm transition-colors ${
        isDark ? "bg-slate-900" : "bg-white"
      }`}
    >
      {/* Header */}
      <div
        className={`px-6 py-4 border-b ${
          isDark ? "border-slate-700 bg-slate-800" : "border-gray-200 bg-gray-50"
        }`}
      >
        <h1
          className={`text-lg font-semibold ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          Trading Strategy Assistant
        </h1>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div
              className={`text-center ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <p className="text-xl font-medium mb-2">{GREETING}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt.prompt)}
                  className={`p-4 rounded-lg text-left transition-all ${
                    isDark
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200"
                  }`}
                >
                  <div className="font-medium mb-1">{prompt.label}</div>
                  <div
                    className={`text-sm ${
                      isDark ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    {prompt.prompt.substring(0, 60)}...
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === "user"
                      ? isDark
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : isDark
                      ? "bg-slate-800 text-slate-200 border border-slate-700"
                      : "bg-gray-100 text-gray-900 border border-gray-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === "user"
                        ? "text-blue-100"
                        : isDark
                        ? "text-slate-500"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className={`rounded-lg px-4 py-3 ${
                    isDark
                      ? "bg-slate-800 text-slate-400 border border-slate-700"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div
          className={`mx-6 mb-2 px-4 py-2 rounded-lg ${
            isDark ? "bg-red-900/50 text-red-200" : "bg-red-50 text-red-800"
          }`}
        >
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Input Area */}
      <div
        className={`px-6 py-4 border-t ${
          isDark ? "border-slate-700 bg-slate-800" : "border-gray-200 bg-gray-50"
        }`}
      >
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={PLACEHOLDER_INPUT}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              isDark
                ? "bg-slate-900 border-slate-600 text-slate-100 placeholder-slate-500 focus:ring-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            } disabled:opacity-50`}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-700 disabled:text-slate-500"
                : "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
            } disabled:cursor-not-allowed`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
