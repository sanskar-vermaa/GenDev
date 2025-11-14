# GenDev

**An AI-powered project** that generates a complete website from a simple text prompt (examples: calculator, tic‑tac‑toe, to‑do app) — and also runs it inside your local environment.

> **Note:** The backend uses Google Gemini API (Flash 2.5) to generate HTML, CSS, and JS code.

---

## 🔥 Features

* Generate full websites (HTML, CSS, JS) using a single text prompt.
* Run the generated project instantly or download it as a ZIP.
* Built‑in template support: Calculator, Tic‑Tac‑Toe, To‑Do List, Landing Page, Contact Form.
* Accepts custom prompts — AI generates the exact layout & styling you ask for.
* Backend powered by Gemini (Flash 2.5) for fast & structured code generation.

---

## 🧭 Architecture

```
[Client (React/Vanilla)]  <-->  [Backend (Node/Express)]  <-->  [Gemini API (Flash 2.5)]
```

* **Client:** UI for prompt input, preview window, run & download buttons.
* **Backend:** Handles prompts, sends requests to Gemini, processes responses, stores generated files.
* **Gemini API:** Generates HTML/CSS/JS from natural language prompts.

---



---




## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
