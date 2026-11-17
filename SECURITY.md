# Security Policy — AuraGuard AI

## 🛡️ Executive Security Summary

AuraGuard AI is engineered with defense-in-depth principles for secure client-side execution, zero-trust secrets management, and robust environmental telemetry handling.

---

## 🔒 1. Zero Hardcoded Secrets Policy

- **No Hardcoded API Keys**: No API keys (WeatherAPI, Google Gemini, Open-Meteo, Vercel) are ever hardcoded or committed to git history.
- **Environment Variable Integration**: Keys are injected securely via runtime environment variables (`VITE_GEMINI_API_KEY`, `VITE_WEATHERAPI_KEY`) or user-configured through local browser storage.
- **In-Memory & Scoped Storage**: Any user-provided API key entered via the UI modal is stored strictly in client-side `localStorage` on the user's browser, never sent to any third-party logging, analytics, or telemetry proxy.

---

## 🌐 2. Telemetry Ingestion & Transport Security

- **Strict HTTPS / TLS 1.3**: All telemetry endpoints communicate exclusively over secure HTTPS:
  - `https://api.weatherapi.com/v1/forecast.json`
  - `https://air-quality-api.open-meteo.com/v1/air-quality`
  - `https://api.open-meteo.com/v1/forecast`
  - `https://generativelanguage.googleapis.com/v1beta/`
- **Network Resilience & Timeout Circuit Breaker**: Network requests utilize an exponential backoff wrapper (`fetchWithRetry`) with a 6000ms abort controller timeout, preventing hanging socket depletion or resource exhaustion.
- **Zero Sensitive Data in Telemetry Requests**: Only public geographic coordinate pairs (`latitude`, `longitude`) are transmitted to weather services. No IP addresses, user profile identities, or device fingerprints are attached.

---

## 🛡️ 3. Client-Side XSS & Content Security

- **React DOM Escaping**: All dynamic strings (city names, AQI values, sensor labels, user inputs) are safely interpolated through React DOM JSX escaping, preventing Cross-Site Scripting (XSS).
- **Safe Outbound Links**: All external hyperlinks strictly specify `rel="noopener noreferrer"` and `target="_blank"`.
- **Markdown Sanitization**: Generative AI chat responses and mitigation cards are rendered using structured components without unescaped `dangerouslySetInnerHTML`.

---

## 🤖 4. Generative AI Safety & Guardrails

- **System Persona Boundary**: The Gemini 2.0 system instruction explicitly prohibits medical diagnoses or clinical alterations, urging professional healthcare consultation for respiratory flare-ups.
- **Anti-Myth & Fact Verification**: Guardrails specifically detect and debunk common folk myths (burning incense, boiling camphor/eucalyptus, dry sweeping).
- **Prompt Injection Defense**: User queries are isolated within designated structured prompt delimiters, preventing system prompt overriding.

---

## 🚨 5. Reporting a Vulnerability

If you discover a security vulnerability in AuraGuard AI, please report it privately:
- **Author**: Priyag Rohilla (`PRIYAGDEV`)
- **Email**: `priyagrohilla2008@gmail.com`
- **Response SLA**: Initial triage within 24 hours.
