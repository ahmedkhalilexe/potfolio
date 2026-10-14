# AMRANI ahmed khalil — Portfolio (TUI Edition) ⚡

```text
┌── khalil@portfolio: ~ ───────────────────────────────────────────────── [☾ / ☼] ┐
│                                                                                  │
│   █████╗ ███╗   ███╗██████╗  █████╗ ███╗   ██╗██╗                                │
│  ██╔══██╗████╗ ████║██╔══██╗██╔══██╗████╗  ██║██║                                │
│  ███████║██╔████╔██║██████╔╝███████║██╔██╗ ██║██║                                │
│  ██╔══██║██║╚██╔╝██║██╔══██╗██╔══██║██║╚██╗██║██║                                │
│  ██║  ██║██║ ╚═╝ ██║██║  ██║██║  ██║██║ ╚████║██║                                │
│  ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝                                │
│    ─── [ SOFTWARE ENGINEER & SYSTEMS BUILDER ] ───                               │
│                                                                                  │
└─ [NORMAL] ─── main ─── utf-8 ─── Ln 1, Col 1 ────────────────────────── 100% ────┘
```

A fast, minimalist personal portfolio engineered with a modern **Terminal User Interface (TUI)** aesthetic, **Tokyo Night** theming, dynamic terminal micro-animations, and in-depth markdown system design case studies.

Zero client-side framework bloat — pure static HTML output, instant page loads, and native keyboard navigation.

---

## ⚡ Tech Stack & Architecture

| Layer                   | Technology                                        | Purpose                                                                       |
| :---------------------- | :------------------------------------------------ | :---------------------------------------------------------------------------- |
| **Framework**           | [Astro 5](https://astro.build/)                   | Static Site Generation (SSG), Content Collections, zero JS hydration overhead |
| **Runtime & PM**        | [Bun](https://bun.sh/)                            | Lightning-fast package management and local builds (~1.2s total build time)   |
| **Styling**             | [Tailwind CSS v4](https://tailwindcss.com/)       | Modern CSS engine with custom Tokyo Night CSS design tokens                   |
| **Syntax Highlighting** | [Shiki](https://shiki.style/)                     | Native dual-theme code rendering (`tokyo-night` & `github-light`)             |
| **SEO & Discovery**     | `@astrojs/sitemap`                                | Auto-generated sitemaps, OpenGraph metadata, Twitter cards, and `robots.txt`  |
| **Deployment Target**   | [Cloudflare Pages](https://pages.cloudflare.com/) | Edge-cached static hosting with sub-50ms global TTFB                          |

---

## ✨ Features

- **Tokyo Night Dual Theming**: Seamless switching between **Tokyo Night Dark** (`#1a1b26`) and **Tokyo Night Light** (`#e8e9f0`) with zero-flash pre-render persistence.
- **Micro-Bundle Size**: Only **~4.7 KB** of vanilla client JavaScript (2.1 KB gzipped) powering terminal animations and keyboard listeners.
- **Interactive CLI Modal Shell**: Press <kbd>/</kbd> anywhere to open a live command interpreter supporting:
  - `help` — List available shell operations
  - `whoami` / `neofetch` — System spec & engineer dossier
  - `projects` — List active case studies and jump to routes
  - `skills` — Print verified technical proficiencies
  - `cat cv.txt` — View CV summary and download PDF
  - `theme` — Toggle Tokyo Night dark/light palette
  - `scanlines` — Toggle retro CRT monitor scanline overlay
  - `contact` — Print verified communication endpoints
- **Vim & Keyboard Navigation**:
  - <kbd>1</kbd> — Jump to `~/home`
  - <kbd>2</kbd> — Jump to `~/projects`
  - <kbd>3</kbd> — Jump to `~/experience`
  - <kbd>4</kbd> — Jump to `~/skills`
  - <kbd>T</kbd> — Toggle theme
  - <kbd>J</kbd> / <kbd>K</kbd> — Smooth buffer scrolling
  - <kbd>/</kbd> or <kbd>?</kbd> — Open CLI interpreter
  - <kbd>Esc</kbd> — Close CLI modal
- **System Design Case Studies**: Rich markdown articles equipped with ASCII architecture flowcharts, domain models, and engineering tradeoffs:
  - **Notiq** — Multi-tenant event-driven notification engine (Bun, RabbitMQ, Redis, PostgreSQL, DDD).
  - **Inovask CLI** — Two-phase schema-driven dynamic UI generator & Docker CLI.
  - **Quiz AI** — Google Gemini 2.0 curriculum ingestion & assessment engine.
  - **ISO Voyage** — High-velocity monolith modernization & B2B in-app messaging.
- **Production-Ready SEO**: OpenGraph tags, Twitter cards, canonical links, auto-generated sitemap (`/sitemap-index.xml`), and custom TUI 404 page (`/404`).

---

## 📂 Project Structure

```text
portfolio/
├── public/
│   ├── amraniahmedkhalil.pdf      # Direct CV download
│   ├── robots.txt                 # Search engine crawler instructions
│   └── og-preview.png             # (Optional) Social sharing image (1200x630)
├── src/
│   ├── content.config.ts          # Astro 5 type-safe content schema
│   ├── content/
│   │   └── projects/              # Markdown case studies
│   │       ├── notiq.md
│   │       ├── inovask-cli.md
│   │       ├── academic-quiz-ai.md
│   │       └── iso-voyage.md
│   ├── components/                # Modular TUI components
│   │   ├── AsciiHero.astro        # Neofetch dossier & typewriter effect
│   │   ├── ExperienceCard.astro   # Career milestones with metric tags
│   │   ├── ProjectCard.astro      # Case study cards & repo indicators
│   │   └── SkillsGrid.astro       # Verified technical matrix
│   ├── layouts/
│   │   └── BaseLayout.astro       # Terminal window frame, statusbar & CLI
│   ├── pages/
│   │   ├── index.astro            # Main dossier landing view
│   │   ├── 404.astro              # Terminal buffer-not-found error page
│   │   └── projects/
│   │       ├── index.astro        # Directory index of all projects
│   │       └── [slug].astro       # Dynamic markdown case study renderer
│   └── styles/
│       └── global.css             # Tokyo Night palette & TUI CSS primitives
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 📬 Contact & Socials

- **Engineer**: AMRANI ahmed khalil
- **Role**: Software Engineer (Systems, CLI Tooling, Clean Architecture)
- **Email**: [career.amraniahmedkhalil@gmail.com](mailto:career.amraniahmedkhalil@gmail.com)
- **LinkedIn**: [linkedin.com/in/ahmedkhalilexe](https://www.linkedin.com/in/ahmedkhalilexe/)
- **GitHub**: [@ahmedkhalilexe](https://github.com/ahmedkhalilexe)
- **Location**: Ain Defla, Algeria (Remote Worldwide)

---

## 📄 License

MIT © [AMRANI ahmed khalil](https://github.com/ahmedkhalilexe)
