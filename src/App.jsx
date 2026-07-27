import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KpiMetrics from './components/KpiMetrics';
import TelemetryCharts from './components/TelemetryCharts';
import SchemaDriftLog from './components/SchemaDriftLog';
import ThresholdModal from './components/ThresholdModal';
import ArchitectureModal from './components/ArchitectureModal';
import { 
  INITIAL_PIPELINES, 
  INITIAL_ANOMALIES, 
  GENERATE_TIMESERIES 
} from './data/mockTelemetry';

export default function App() {
  const [pipelines, setPipelines] = useState(INITIAL_PIPELINES);
  const [anomalies, setAnomalies] = useState(INITIAL_ANOMALIES);
  const [timeSeriesData, setTimeSeriesData] = useState(GENERATE_TIMESERIES());
  const [activePipelineId, setActivePipelineId] = useState('pipe-001');
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState('admin');
  const [isLive, setIsLive] = useState(true);
  const [isThresholdModalOpen, setIsThresholdModalOpen] = useState(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [thresholds, setThresholds] = useState({
    latencyLimit: 100,
    nullLimit: 2.0,
    healthScoreLimit: 90.0,
  });

  // Simulated live telemetry stream loop
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // 1. Update time series
      setTimeSeriesData(prev => {
        const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const lastPoint = prev[prev.length - 1] || { latency: 30, throughput: 75000, errorRate: 0.2, qualityScore: 98.5 };
        const newLatency = Math.max(15, Math.min(250, Math.floor(lastPoint.latency + (Math.random() * 12 - 5))));
        const newErrorRate = Number(Math.max(0, Math.min(5, lastPoint.errorRate + (Math.random() * 0.4 - 0.2))).toFixed(2));
        
        const newPoint = {
          time: nextTime,
          latency: newLatency,
          throughput: Math.floor(70000 + Math.random() * 15000),
          errorRate: newErrorRate,
          qualityScore: Number((100 - newErrorRate * 2.5).toFixed(1)),
        };

        return [...prev.slice(1), newPoint];
      });

      // 2. Randomly jitter active pipelines latency & health
      setPipelines(prev => prev.map(p => {
        const latencyJitter = Math.floor(Math.random() * 6 - 3);
        const nextLatency = Math.max(10, p.latencyMs + latencyJitter);
        let status = 'healthy';
        if (nextLatency > thresholds.latencyLimit * 2) {
          status = 'critical';
        } else if (nextLatency > thresholds.latencyLimit) {
          status = 'degraded';
        }
        
        const healthScore = Number(Math.max(50, Math.min(100, 100 - (nextLatency / 10) - (p.nullPercentage * 2))).toFixed(1));

        return {
          ...p,
          latencyMs: nextLatency,
          healthScore,
          status,
          lastSync: 'Just now',
        };
      }));

    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, thresholds]);

  // Filter pipelines based on search query
  const filteredPipelines = pipelines.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePipeline = pipelines.find(p => p.id === activePipelineId) || pipelines[0];

  const handleResolveAnomaly = (anomalyId) => {
    setAnomalies(prev => prev.map(a => a.id === anomalyId ? { ...a, severity: 'resolved' } : a));
  };

  const handleSaveThresholds = (newThresholds) => {
    setThresholds(newThresholds);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* Navigation Header */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        role={role}
        setRole={setRole}
        onOpenThresholds={() => setIsThresholdModalOpen(true)}
        onOpenArchitecture={() => setIsArchModalOpen(true)}
        isLive={isLive}
        onToggleLive={() => setIsLive(!isLive)}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8 sm:px-6">
        
        {/* Banner */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">PostgreSQL Telemetry & Data Quality Dashboard</h2>
            <p className="text-xs text-slate-400 mt-1">
              Real-time monitoring of schema drift, latency SLAs, null rates, and pipeline health scores.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              Active Focus: <strong className="text-cyan-400">{activePipeline.name}</strong>
            </span>
          </div>
        </div>

        {/* 1. Key Metrics Cards */}
        <KpiMetrics pipelines={pipelines} anomalies={anomalies} thresholds={thresholds} />

        {/* 2. Visual Analytics Charts */}
        <TelemetryCharts timeSeriesData={timeSeriesData} activePipeline={activePipeline} />

        {/* 3. Pipeline Registry & Schema Drift Logs */}
        <SchemaDriftLog 
          pipelines={filteredPipelines}
          anomalies={anomalies}
          activePipelineId={activePipelineId}
          onSelectPipeline={(id) => setActivePipelineId(id)}
          onResolveAnomaly={handleResolveAnomaly}
          role={role}
        />

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 font-mono">
        <p>Data Observability Dashboard • Built with React, Vite, JavaScript, Tailwind CSS & Recharts</p>
        <p className="mt-1 text-slate-600">Created by Bhaswath Datla • <a href="https://github.com/Bhasu333/data-observability-dashboard" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline">GitHub Repository</a></p>
      </footer>

      {/* Modals */}
      <ThresholdModal 
        isOpen={isThresholdModalOpen}
        onClose={() => setIsThresholdModalOpen(false)}
        thresholds={thresholds}
        onSave={handleSaveThresholds}
        role={role}
      />

      <ArchitectureModal 
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

    </div>
  );
}
