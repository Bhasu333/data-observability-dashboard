import React from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle, 
  Terminal, 
  RefreshCw, 
  Check, 
  ShieldAlert,
  ArrowUpRight,
  Database
} from 'lucide-react';

export default function SchemaDriftLog({ 
  pipelines, 
  anomalies, 
  activePipelineId, 
  onSelectPipeline,
  onResolveAnomaly,
  role 
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="h-3 w-3" /> Healthy
          </span>
        );
      case 'degraded':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20">
            <AlertTriangle className="h-3 w-3" /> Degraded
          </span>
        );
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-400 border border-rose-500/20 animate-pulse">
            <AlertCircle className="h-3 w-3" /> Critical
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      
      {/* Table 1: Ingestion Pipelines Monitor */}
      <div className="glass-card rounded-xl p-5 lg:col-span-2 flex flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">PostgreSQL Data Pipeline Registry</h2>
            </div>
            <span className="text-xs text-slate-400">Click a row to inspect metrics</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Pipeline Name</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Throughput</th>
                  <th className="py-3 px-4">Latency</th>
                  <th className="py-3 px-4">Null %</th>
                  <th className="py-3 px-4">Schema Version</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {pipelines.map((pipe) => {
                  const isSelected = pipe.id === activePipelineId;
                  return (
                    <tr 
                      key={pipe.id}
                      onClick={() => onSelectPipeline(pipe.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-cyan-500/10 border-l-2 border-l-cyan-400' 
                          : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                        <span>{pipe.name}</span>
                        {isSelected && <ArrowUpRight className="h-3 w-3 text-cyan-400" />}
                      </td>
                      <td className="py-3.5 px-4">{getStatusBadge(pipe.status)}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-200">
                        {pipe.throughput.toLocaleString()} <span className="text-slate-500">rec/s</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <span className={pipe.latencyMs > 100 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                          {pipe.latencyMs} ms
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {pipe.nullPercentage}%
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                        {pipe.schemaVersion}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Feed 2: Real-time Schema Drift & Anomaly Feed */}
      <div className="glass-card rounded-xl p-5 flex flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Schema Drift & Anomalies</h2>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Live Monitor
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[320px] pr-1">
            {anomalies.map((anom) => (
              <div 
                key={anom.id}
                className={`rounded-lg border p-3 text-xs transition-all ${
                  anom.severity === 'critical'
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                    : anom.severity === 'warning'
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between font-mono mb-1">
                  <span className="font-bold flex items-center gap-1.5">
                    {anom.severity === 'critical' && <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />}
                    {anom.severity === 'warning' && <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />}
                    {anom.severity === 'resolved' && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                    {anom.type}
                  </span>
                  <span className="text-[10px] text-slate-400">{anom.timestamp}</span>
                </div>
                <p className="text-slate-300 font-sans leading-relaxed mb-2">{anom.message}</p>
                
                <div className="flex items-center justify-between pt-1 border-t border-slate-700/40 font-mono text-[10px]">
                  <span className="text-slate-400">Target: {anom.pipeline}</span>
                  {anom.severity !== 'resolved' && role === 'admin' && (
                    <button
                      onClick={() => onResolveAnomaly(anom.id)}
                      className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-semibold"
                    >
                      Resolve Alert
                    </button>
                  )}
                  {anom.severity !== 'resolved' && role === 'analyst' && (
                    <span className="text-slate-500 italic">View Only Mode</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
