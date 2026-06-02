// Mock Telemetry Engine & PostgreSQL Data Pipeline Schema Data

export const INITIAL_PIPELINES = [
  {
    id: 'pipe-001',
    name: 'user_events_stream',
    source: 'PostgreSQL (public.user_events)',
    destination: 'Analytics Data Warehouse',
    status: 'healthy',
    throughput: 12450, // rec/sec
    latencyMs: 28,
    healthScore: 99.2,
    nullPercentage: 0.12,
    schemaVersion: 'v2.4.1',
    lastSync: 'Just now',
    qualityScores: {
      completeness: 99.8,
      uniqueness: 99.5,
      timeliness: 98.9,
      accuracy: 99.0,
    }
  },
  {
    id: 'pipe-002',
    name: 'order_checkout_ingest',
    source: 'PostgreSQL (orders_db)',
    destination: 'Financial Ledger Service',
    status: 'degraded',
    throughput: 4120,
    latencyMs: 142,
    healthScore: 84.5,
    nullPercentage: 3.45,
    schemaVersion: 'v1.8.0',
    lastSync: '12s ago',
    qualityScores: {
      completeness: 94.2,
      uniqueness: 98.1,
      timeliness: 82.0,
      accuracy: 96.5,
    }
  },
  {
    id: 'pipe-003',
    name: 'sensor_telemetry_raw',
    source: 'IoT Edge Stream (MQTT)',
    destination: 'TimescaleDB / Postgres',
    status: 'healthy',
    throughput: 48900,
    latencyMs: 19,
    healthScore: 98.7,
    nullPercentage: 0.05,
    schemaVersion: 'v3.1.0',
    lastSync: 'Just now',
    qualityScores: {
      completeness: 99.1,
      uniqueness: 99.9,
      timeliness: 99.4,
      accuracy: 98.2,
    }
  },
  {
    id: 'pipe-004',
    name: 'ml_feature_store_v2',
    source: 'PostgreSQL (features_schema)',
    destination: 'PyTorch Model Inference Queue',
    status: 'healthy',
    throughput: 8700,
    latencyMs: 45,
    healthScore: 96.8,
    nullPercentage: 0.88,
    schemaVersion: 'v2.0.3',
    lastSync: '5s ago',
    qualityScores: {
      completeness: 98.5,
      uniqueness: 97.4,
      timeliness: 96.1,
      accuracy: 97.8,
    }
  },
  {
    id: 'pipe-005',
    name: 'payment_reconciliation_job',
    source: 'PostgreSQL (payments)',
    destination: 'Stripe Audit Log',
    status: 'critical',
    throughput: 890,
    latencyMs: 310,
    healthScore: 71.3,
    nullPercentage: 6.80,
    schemaVersion: 'v1.2.9 (Drift Detected)',
    lastSync: '45s ago',
    qualityScores: {
      completeness: 88.0,
      uniqueness: 92.3,
      timeliness: 71.5,
      accuracy: 89.1,
    }
  }
];

export const INITIAL_ANOMALIES = [
  {
    id: 'anom-101',
    timestamp: '10:54:12',
    pipeline: 'payment_reconciliation_job',
    type: 'Schema Drift',
    severity: 'critical',
    message: 'Unexpected column `metadata_v2` added with NULL rate > 5.0%. PostgreSQL table constraint warning.',
  },
  {
    id: 'anom-102',
    timestamp: '10:51:04',
    pipeline: 'order_checkout_ingest',
    type: 'Latency SLA Breach',
    severity: 'warning',
    message: 'Ingestion latency (142ms) exceeded 100ms warning threshold.',
  },
  {
    id: 'anom-103',
    timestamp: '10:42:30',
    pipeline: 'user_events_stream',
    type: 'Type Mismatch',
    severity: 'resolved',
    message: 'Automatic type coercion applied for field `user_id` (VARCHAR -> BIGINT).',
  }
];

export const GENERATE_TIMESERIES = () => {
  const points = [];
  const now = Date.now();
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now - i * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    points.push({
      time,
      latency: Math.floor(25 + Math.random() * 20 + (i === 3 ? 65 : 0)),
      throughput: Math.floor(70000 + Math.random() * 15000),
      errorRate: Number((0.1 + Math.random() * 0.4 + (i === 3 ? 1.8 : 0)).toFixed(2)),
      qualityScore: Number((97 + Math.random() * 2.5 - (i === 3 ? 4 : 0)).toFixed(1)),
    });
  }
  return points;
};
