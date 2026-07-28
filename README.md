# Data Observability Dashboard

A high-performance full-stack web application designed for real-time tracking, anomaly detection, schema drift monitoring, and data quality visualization across complex data pipelines and telemetry datasets.

![System Architecture](architecture.svg)

---

## 🌟 Key Features

- **Real-Time Telemetry Stream**: Live streaming telemetry ingestion metrics showing latency (ms), pipeline throughput (records/sec), and error rates.
- **Schema Drift & Anomaly Alerting**: Continuous audit feed detecting NULL rate spikes, missing table constraints, and type mismatches.
- **Data Quality Scoring Engine**: Multi-dimensional quality scoring validating Completeness, Uniqueness, Timeliness, Accuracy, and Validity against PostgreSQL SLA rules.
- **Role-Based Access Control (RBAC)**: Mode toggle supporting **Admin** (full alert resolution and threshold configuration) and **Analyst** (read-only view).
- **Interactive Visualizations**: Time-series area charts and comparative bar graphs powered by Recharts.
- **Dark Glassmorphism Design**: Tailored UI matching modern developer tooling standards using Tailwind CSS and Lucide React.

---

## 🛠️ Tech Stack

This project was built to **100% mirror the skills on my resume**:

- **Programming Languages**: JavaScript (ES6+), HTML5, SQL (PostgreSQL & SQLite schema representation)
- **Web & Cloud Frameworks**: React 18, Vite, Tailwind CSS
- **Visualization & UI Libraries**: Recharts, Lucide React
- **Deployment & Cloud**: Vercel, Git / GitHub

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Bhasu333/data-observability-dashboard.git
   cd data-observability-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📊 Telemetry Data Schema

```json
{
  "pipeline_id": "pipe-001",
  "name": "user_events_stream",
  "source": "PostgreSQL (public.user_events)",
  "destination": "Analytics Data Warehouse",
  "status": "healthy",
  "throughput_rec_sec": 12450,
  "latency_ms": 28,
  "health_score": 99.2,
  "null_percentage": 0.12,
  "schema_version": "v2.4.1",
  "quality_scores": {
    "completeness": 99.8,
    "uniqueness": 99.5,
    "timeliness": 98.9,
    "accuracy": 99.0
  }
}
```

---

## 👤 Author

**Bhaswath Datla**  
*B.S. in Computer Science, University of Washington (Expected June 2028)*  
- Portfolio: [Bhaswath Datla Portfolio](https://github.com/Bhasu333/portofolio-website)
