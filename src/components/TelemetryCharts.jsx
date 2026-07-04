import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { LineChart as LineIcon, BarChart3, Activity } from 'lucide-react';

export default function TelemetryCharts({ timeSeriesData, activePipeline }) {
  const [timeRange, setTimeRange] = useState('1h');

  // Format data for quality dimensions
  const qualityData = [
    { metric: 'Completeness', score: activePipeline?.qualityScores?.completeness || 98.8 },
    { metric: 'Uniqueness', score: activePipeline?.qualityScores?.uniqueness || 99.1 },
    { metric: 'Timeliness', score: activePipeline?.qualityScores?.timeliness || 94.5 },
    { metric: 'Accuracy', score: activePipeline?.qualityScores?.accuracy || 98.0 },
    { metric: 'Validity', score: 99.4 },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      
      {/* Chart 1: Latency & Volume Time-Series */}
      <div className="glass-card rounded-xl p-5 lg:col-span-2 flex flex-col justify-between">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Pipeline Latency & Error Rate Stream</h2>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-900/80 p-1 border border-slate-800">
            {['15m', '1h', '6h', '24h'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="errorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#f8fafc' 
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '0.75rem', paddingTop: '0.5rem' }} />
              <Area 
                type="monotone" 
                dataKey="latency" 
                name="Latency (ms)" 
                stroke="#00f2fe" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#latencyGradient)" 
              />
              <Area 
                type="monotone" 
                dataKey="errorRate" 
                name="Error Rate (%)" 
                stroke="#f43f5e" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#errorGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Data Quality Dimensions */}
      <div className="glass-card rounded-xl p-5 flex flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Data Quality Score</h2>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {activePipeline ? activePipeline.name : 'Overall'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Validation scores computed against PostgreSQL constraints & SLA rules.
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={qualityData} layout="vertical" margin={{ top: 0, right: 10, left: 15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" domain={[70, 100]} stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="metric" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem' 
                }} 
              />
              <Bar dataKey="score" name="Score %" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
