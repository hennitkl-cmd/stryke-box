
# Stryke AI Chatbot for Landing Page

Build a floating AI chatbot widget on the landing page powered by Lovable AI, acting as the Stryke AI Assistant to answer visitor questions and drive waitlist signups.

---

## What You'll Get

- A floating chat bubble (bottom-right corner) with the Stryke brand styling
- Expandable chat window with message history, streaming AI responses, and markdown rendering
- The full Stryke AI personality and knowledge base baked into the backend prompt
- Mobile-responsive design matching the existing glass/dark aesthetic
- Smooth open/close animations using Framer Motion

---

## Architecture

The chatbot will consist of three parts:

1. **Backend function** (`chat`) -- Receives user messages, prepends the full Stryke system prompt, and streams responses from the AI gateway
2. **Chat UI component** (`AIChatbot.tsx`) -- Floating button + expandable chat panel with message bubbles, input field, and streaming text display
3. **Integration** -- Added to the Index page alongside existing landing sections

---

## Changes

### 1. Create backend function: `supabase/functions/chat/index.ts`
- Accepts `{ messages }` from the client
- Prepends the full Stryke AI system prompt (all the personality, knowledge, and guardrails from the brief)
- Calls `https://ai.gateway.lovable.dev/v1/chat/completions` with `google/gemini-3-flash-preview` and `stream: true`
- Returns the SSE stream directly to the client
- Handles 429 (rate limit) and 402 (payment required) errors

### 2. Update `supabase/config.toml`
- Register the `chat` function with `verify_jwt = false` (public access for landing page visitors)

### 3. Create chat UI: `src/components/landing/AIChatbot.tsx`
- **Floating button**: Fixed bottom-right, red glow, boxing glove or message icon, pulse animation
- **Chat panel**: Glass-card styled panel (~400px wide, ~500px tall) with:
  - Header with "Stryke AI" title and close button
  - Scrollable message area with user/assistant message bubbles
  - Markdown rendering for AI responses (install `react-markdown`)
  - Text input with send button
  - Typing indicator while streaming
- **Streaming**: Token-by-token SSE parsing, updating assistant message progressively
- **Welcome message**: Auto-display initial greeting on first open
- Framer Motion animations for open/close transitions
- Mobile: full-width panel on small screens

### 4. Update `src/pages/Index.tsx`
- Import and render `AIChatbot` component inside the page

### 5. Install dependency
- Add `react-markdown` for rendering AI responses with proper formatting

---

## Technical Details

### System Prompt (backend only)
The entire Stryke AI prompt provided above will be embedded in the edge function as the system message. It will never be visible to the client.

### Message Flow
1. User types message in chat input
2. Client sends `POST` to `/functions/v1/chat` with conversation history
3. Edge function prepends system prompt, calls AI gateway with streaming
4. SSE tokens stream back, rendered progressively in the chat bubble
5. Conversation history maintained in React state (no database persistence needed)

### Styling
- Chat bubble: `glass-card` with `glow-red` effect
- Messages: User messages right-aligned with primary background, assistant messages left-aligned with glass background
- Input area: Matches existing `Input` component styling
- Responsive: Full-width overlay on mobile, floating panel on desktop

---

## Files Summary

| File | Action |
|------|--------|
| `supabase/functions/chat/index.ts` | Create -- AI chat backend with Stryke system prompt |
| `supabase/config.toml` | Update -- Register chat function |
| `src/components/landing/AIChatbot.tsx` | Create -- Floating chatbot UI with streaming |
| `src/pages/Index.tsx` | Update -- Add AIChatbot component |
| `package.json` | Update -- Add `react-markdown` dependency |
