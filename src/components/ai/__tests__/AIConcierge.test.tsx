import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";
import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";

// Mock next/navigation
const mockPush = mock(() => {});
mock.module("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock framer-motion
// Use a simple functional component for motion components to just render children
const MotionDiv = ({ children, ...props }: any) => <div {...props}>{children}</div>;
const MotionButton = ({ children, ...props }: any) => <button {...props}>{children}</button>;

mock.module("framer-motion", () => ({
  motion: {
    div: MotionDiv,
    button: MotionButton,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

import AIConcierge from "../AIConcierge";

describe("AIConcierge", () => {
  beforeEach(() => {
    mockPush.mockClear();
    // Reset fetch mock
    global.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ filters: { keywords: ["test"] } }),
      } as Response)
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("should render closed initially", () => {
    render(<AIConcierge />);
    // Check if the trigger button is present
    const triggerButtons = screen.getAllByText("AI Concierge");
    expect(triggerButtons.length).toBe(1);

    // Check if the chat window is NOT present
    const chatWindow = screen.queryByText("Personal Property Shopper");
    expect(chatWindow).toBeNull();
  });

  test("should open on click", async () => {
    render(<AIConcierge />);
    const triggerButton = screen.getByText("AI Concierge");
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByText("Personal Property Shopper")).toBeTruthy();
    });
  });

  test("should not search when query is empty", async () => {
    render(<AIConcierge />);

    // Open the concierge
    const triggerButton = screen.getByText("AI Concierge");
    fireEvent.click(triggerButton);
    await waitFor(() => screen.getByPlaceholderText("Ask anything..."));

    const input = screen.getByPlaceholderText("Ask anything...");
    const buttons = screen.getAllByRole("button");
    const sendButton = buttons.find(b => b.querySelector('svg.lucide-send') || b.className.includes("absolute right-2"));

    if (!sendButton) throw new Error("Send button not found");

    // Ensure input is empty
    fireEvent.change(input, { target: { value: "   " } });

    // Attempt search
    fireEvent.click(sendButton);

    // Verify fetch was NOT called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("should search with valid query", async () => {
    render(<AIConcierge />);

    // Open
    fireEvent.click(screen.getByText("AI Concierge"));
    await waitFor(() => screen.getByPlaceholderText("Ask anything..."));

    const input = screen.getByPlaceholderText("Ask anything...");
    const buttons = screen.getAllByRole("button");
    const sendButton = buttons.find(b => b.querySelector('svg.lucide-send') || b.className.includes("absolute right-2"));
    if (!sendButton) throw new Error("Send button not found");

    // Type query
    fireEvent.change(input, { target: { value: "I need a flat" } });

    // Send
    fireEvent.click(sendButton);

    // Verify fetch called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const callArgs = (global.fetch as any).mock.calls[0];
    expect(callArgs[0]).toBe("/api/ai-search");
    expect(JSON.parse(callArgs[1].body)).toEqual({ query: "I need a flat" });

    // Verify router push
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1);
    });
  });

  test("should show loading state", async () => {
    // Delay the fetch response to check loading state
    // Return empty object to prevent closing the modal
    global.fetch = mock(() => new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            json: () => Promise.resolve({ })
        } as Response);
      }, 100);
    }));

    render(<AIConcierge />);
    fireEvent.click(screen.getByText("AI Concierge"));
    await waitFor(() => screen.getByPlaceholderText("Ask anything..."));

    const input = screen.getByPlaceholderText("Ask anything...");
    const buttons = screen.getAllByRole("button");
    const sendButton = buttons.find(b => b.querySelector('svg.lucide-send') || b.className.includes("absolute right-2"));
    if (!sendButton) throw new Error("Send button not found");

    fireEvent.change(input, { target: { value: "loading test" } });
    fireEvent.click(sendButton);

    // Check loading state immediately after click
    expect(input.hasAttribute("disabled")).toBe(true);
    expect(sendButton.hasAttribute("disabled")).toBe(true);

    // Wait for finish
    await waitFor(() => expect(input.hasAttribute("disabled")).toBe(false), { timeout: 1000 });
  });
});
