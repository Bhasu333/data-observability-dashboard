# Data Observability Dashboard

A high-performance full-stack web application designed for real-time tracking, anomaly detection, and data quality visualization across complex data pipelines and telemetry datasets.

## Core Purpose

Provide data engineers and system administrators with immediate visibility into data pipeline health, schema drift, latency SLA breaches, and data quality metrics through interactive visual dashboards.

## Tech Stack (Aligned with Resume Skills)

- **Programming Languages**: JavaScript (ES6+), HTML5, SQL (PostgreSQL / SQLite)
- **Web Frameworks & Libraries**: React 18, Vite, Tailwind CSS
- **Deployment & Cloud**: Vercel, Git / GitHub
- **Data Layer & Telemetry Engine**: Client-side & API mock telemetry stream engine with PostgreSQL/SQLite schema representation and dynamic dataset generators

## Requirements

### Validated

- [x] Initialized Git repository structure in `data-observability-dashboard`
- [x] Portfolio card presence in `index.html`

### Active

- [ ] Interactive telemetry dashboard with real-time time-series charts (pipeline volume, latency, error rates)
- [ ] Schema drift monitor and anomaly detection alert notifications
- [ ] Data quality metrics breakdown (Completeness, Uniqueness, Timeliness, Validity)
- [ ] Interactive search, filtering, and dataset selector
- [ ] Mock authentication / RBAC system (Admin vs Analyst mode toggle)
- [ ] Automated SVG architecture diagram & comprehensive repository README.md
- [ ] Updated portfolio website link connecting to `https://github.com/Bhasu333/data-observability-dashboard`

### Out of Scope

- Live enterprise cloud PostgreSQL deployment — local/mock DB engine with PostgreSQL schema representation is used for portfolio showcase.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React + Vite + JavaScript | Directly aligns with resume skills (React, Vite, JavaScript, Tailwind) | Selected |
| Lucide + Tailwind | Modern glassmorphism dark theme matching UW portfolio design language | Selected |
| Embedded Telemetry Streamer | Enables offline/instant visual feedback without external database setup | Selected |

---
*Last updated: 2026-07-28 after resume alignment*
