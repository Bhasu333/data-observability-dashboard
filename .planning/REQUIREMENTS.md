# Requirements: Data Observability Dashboard

## Core Functional Requirements

### 1. Dashboard Layout & Metrics Header
- **REQ-1.1**: Display real-time KPI overview cards: Total Active Pipelines, Overall Data Health Score %, Pipeline Latency (ms), Active Anomaly Alerts.
- **REQ-1.2**: Include status indicators (Healthy, Degradation, Critical) with color-coded badges.

### 2. Real-time Telemetry & Visual Analytics
- **REQ-2.1**: Time-series charts for Pipeline Latency & Throughput over time (1h, 6h, 24h, 7d).
- **REQ-2.2**: Data Quality dimension breakdown: Completeness, Uniqueness, Validity, Timeliness, Accuracy.
- **REQ-2.3**: Interactive tooltips, zoom/pan controls, and legend toggles.

### 3. Schema Drift & Anomaly Alerting Engine
- **REQ-3.1**: Log feed listing recent schema modifications, missing column detections, and null-rate spikes.
- **REQ-3.2**: Alert threshold management system allowing users to configure warning/critical boundaries.

### 4. Search, Filtering & Role Controls
- **REQ-4.1**: Search bar to filter data tables and pipelines by name, status, or system tag.
- **REQ-4.2**: Toggle between Admin (full editing privileges, threshold editing) and Analyst (view-only mode).

### 5. Repository Documentation & Portfolio Integration
- **REQ-5.1**: Comprehensive README.md with system architecture diagram, tech stack, and setup instructions.
- **REQ-5.2**: Update portfolio `index.html` with direct GitHub link (`https://github.com/Bhasu333/data-observability-dashboard`) and repository link CTA.
