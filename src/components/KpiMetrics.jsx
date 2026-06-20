import React from 'react';
import { Database, AlertTriangle, CheckCircle2, Clock, Zap, TrendingUp, TrendingDown } from 'lucide-react';

export default function KpiMetrics({ pipelines, anomalies, thresholds }) {
  const totalPipelines = pipelines.length;
  const healthyCount = pipelines.filter(p => p.status === 'healthy').length;
  const avgHealthScore = (pipelines.reduce((sum, p) => sum + p.healthScore, 0) / totalPipelines).toFixed(1);
  const avgLatency = Math.round(pipelines.reduce((sum, p) => sum + p.latencyMs, 0) / totalPipelines);
  
  const activeAnomalies = anomalies.filter(a => a.severity !== 'resolved');
  const activeAlertsCount = activeAnomalies.length;
  const criticalCount = anomalies.filter(a => a.severity === 'critical').length;
  const warningCount = anomalies.filter(a => a.severity === 'warning').length;

  const latencyLimit = thresholds?.latencyLimit || 100;
  const isHealthyScore = Number(avgHealthScore) >= (thresholds?.healthScoreLimit || 90.0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      
      {/* Metric 1: Overall Health Score */}
      <div className="glass-card glass-card-hover rounded-xl p-5 border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Overall Health Score</span>
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-white tracking-tight">{avgHealthScore}%</span>
          <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${
            isHealthyScore 
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
              : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
          }`}>
            {isHealthyScore ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {isHealthyScore ? '+1.2%' : '-1.5%'}
          </span>
        </div>
        <div className="mt-3 text-xs text-slate-400 flex justify-between">
          <span>Target: &gt;{thresholds?.healthScoreLimit || 90}% SLA</span>
          <span className={isHealthyScore ? "text-emerald-400 font-medium" : "text-amber-400 font-medium"}>
            {isHealthyScore ? 'Optimal' : 'Needs Review'}
          </span>
        </div>
      </div>

      {/* Metric 2: Active Ingestion Pipelines */}
      <div className="glass-card glass-card-hover rounded-xl p-5 border-l-4 border-l-cyan-500">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Active Pipelines</span>
          <Database className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-white tracking-tight">{healthyCount} / {totalPipelines}</span>
          <span className="text-xs font-medium text-slate-400">
            {Math.round((healthyCount / totalPipelines) * 100)}% Operational
          </span>
        </div>
        <div className="mt-3 text-xs text-slate-400 flex justify-between">
          <span>Healthy: {healthyCount}</span>
          <span className="text-amber-400">Degraded: {totalPipelines - healthyCount}</span>
        </div>
      </div>

      {/* Metric 3: Ingestion Latency */}
      <div className="glass-card glass-card-hover rounded-xl p-5 border-l-4 border-l-blue-500">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Avg Latency (SLA)</span>
          <Clock className="h-5 w-5 text-blue-400" />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-white tracking-tight">{avgLatency} ms</span>
          <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${
            avgLatency <= latencyLimit 
              ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' 
              : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
          }`}>
            <Zap className="h-3 w-3 mr-1" /> {avgLatency <= latencyLimit ? 'Fast' : 'Slow'}
          </span>
        </div>
        <div className="mt-3 text-xs text-slate-400 flex justify-between">
          <span>Threshold: {latencyLimit}ms</span>
          <span className="text-blue-400 font-medium">PostgreSQL Driver</span>
        </div>
      </div>

      {/* Metric 4: Schema Drift & Anomalies */}
      <div className="glass-card glass-card-hover rounded-xl p-5 border-l-4 border-l-amber-500">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Active Anomalies</span>
          <AlertTriangle className="h-5 w-5 text-amber-400" />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-white tracking-tight">{activeAlertsCount} Alerts</span>
          <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${
            activeAlertsCount > 0 
              ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' 
              : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
          }`}>
            {activeAlertsCount > 0 ? 'Action Req.' : 'All Resolved'}
          </span>
        </div>
        <div className="mt-3 text-xs text-slate-400 flex justify-between">
          <span>{criticalCount} Critical</span>
          <span>{warningCount} Warning</span>
        </div>
      </div>

    </div>
  );
}
