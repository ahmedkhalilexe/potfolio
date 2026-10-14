---
title: "Academic Resource Platform & Gemini 2.0 Quiz Engine"
tagline: "AI-Augmented Course Management & Automated Assessment Platform"
role: "Lead Full Stack Developer (End of Studies Project)"
period: "Oct 2024 – May 2025"
status: "Completed"
featured: true
order: 3
tags: ["Next.js", "Gemini 2.0", "TypeScript", "Redux", "Node.js", "Express.js", "Prisma", "PostgreSQL", "Tailwind CSS"]
metrics:
  - "10+ REST API Endpoints"
  - "Gemini 2.0 automated question generation"
  - "Role-based Teacher & Student workflows"
  - "Real-time grading & analytical reviews"
architectureType: "LLM-Integrated Full-Stack Web Platform"
# PLACEHOLDER: Replace with your real Academic Quiz platform repository URL
github: "https://github.com/ahmedkhalilexe/academic-quiz-platform"
---

# Academic Resource Platform with Gemini 2.0 AI Quiz Engine

> **TL;DR**: An end-to-end academic platform enabling educators to manage university course resources and generate interactive quizzes automatically from pedagogical materials via Google Gemini 2.0.

---

## 1. System Overview & The Vision

Teachers often spend hours manually converting lecture slides and reading materials into assessment questions (multiple-choice, true/false, open-ended). This project addressed the assessment bottleneck by integrating **Gemini 2.0** directly into the curriculum workflow.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DOCUMENT INGESTION & AI PIPELINE                      │
└─────────────────────────────────────────────────────────────────────────────┘

  [Teacher Dashboard]
          │
          │ 1. Upload Course Material (PDF / Markdown / Text)
          ▼
  ┌─────────────────────────────────────────────────────────┐
  │                 Node.js / Express API                   │
  │   - Text Extraction & Token Window Chunking             │
  │   - Prompt Injection Guardrails                         │
  │   - Difficulty & Bloom Taxonomy Framing                 │
  └────────────────────────┬────────────────────────────────┘
                           │
                           │ 2. Structured JSON Output Call
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │                    Google Gemini 2.0                    │
  │   - Semantic Extraction of Key Concepts                 │
  │   - Distractor Synthesis (Plausible false options)      │
  │   - Explanatory Rationale Generation                    │
  └────────────────────────┬────────────────────────────────┘
                           │
                           │ 3. Validated JSON Schema Response
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │                     Prisma ORM                          │
  │   - Transactional persistence into PostgreSQL           │
  │   - Draft questions created for teacher review          │
  └─────────────────────────────────────────────────────────┘
```

---

## 2. Technical Architecture

- **Frontend Application**: Next.js App with Redux Toolkit for complex multi-step quiz state, timer countdowns, and instant visual feedback with Tailwind CSS.
- **Backend Service**: Express.js REST API structured around clean controller-service-repository patterns.
- **Security & Authorization**: Role-Based Access Control (RBAC) distinguishing between Teacher (curriculum creators) and Student (quiz takers), secured with cryptographic JWT access tokens.
- **Data Modeling (Prisma & PostgreSQL)**: Relational schema tracking courses, modules, questions, student attempts, score distributions, and AI generation parameters.

---

## 3. Gemini 2.0 Integration Mechanics

To ensure questions generated were pedagogically sound and conformed to rigorous JSON structures without hallucinations:

```typescript
// Strict schema prompting with Gemini 2.0
const prompt = `
You are an expert academic evaluator. Based on the provided lecture transcript, generate 5 questions.
Ensure distractors (incorrect options) reflect common student misconceptions.
Return ONLY valid JSON adhering to the specified schema:
{
  "questions": [
    {
      "stem": "string",
      "type": "MULTIPLE_CHOICE" | "TRUE_FALSE",
      "options": ["string", "string", "string", "string"],
      "correctIndex": number,
      "explanation": "string"
    }
  ]
}
`;
```

---

## 4. Key Takeaways & Results
- Reduced quiz creation time for educators from **~45 minutes** to **under 20 seconds**.
- Delivered an interactive student quiz-taking interface with instant score breakdowns and contextual explanations for missed questions.
- Built a modular, clean codebase demonstrating full-stack engineering proficiency across client state, API boundaries, and LLM orchestration.
