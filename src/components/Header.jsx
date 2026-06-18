import React from 'react';
import { Activity, Shield, Sliders, Database, Github, Search, RefreshCw, Layers } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  role, 
  setRole, 
  onOpenThresholds, 
  onOpenArchitecture,
  isLive,
  onToggleLive 
}) {
  return (
    <header className="glass-card sticky top-0 z-30 border-b border-slate-800 bg-[#0a0e17]/90 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Brand & Ticker */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/10">
            <Activity className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">Data Observability</h1>
              <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/30">
                v1.0.0
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono">
                <span className={`h-2 w-2 rounded-full ${isLive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
                {isLive ? 'PostgreSQL Stream: LIVE' : 'Stream Paused'}
              </span>
              <span>•</span>
              <button 
                onClick={onToggleLive}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <RefreshCw className={`h-3 w-3 ${isLive ? 'animate-spin' : ''}`} />
                {isLive ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search pipelines, tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-slate-900/80 border border-slate-800 py-1.5 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
            />
          </div>

          {/* Architecture Modal Button */}
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-cyan-400 transition-all"
            title="View System Architecture Diagram"
          >
            <Layers className="h-4 w-4 text-cyan-400" />
            <span className="hidden md:inline">Architecture</span>
          </button>

          {/* Threshold Config Button */}
          <button
            onClick={onOpenThresholds}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-cyan-400 transition-all"
            title="Configure Alert Thresholds"
          >
            <Sliders className="h-4 w-4 text-cyan-400" />
            <span className="hidden md:inline">Thresholds</span>
          </button>

          {/* Role Toggle Button */}
          <button
            onClick={() => setRole(role === 'admin' ? 'analyst' : 'admin')}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              role === 'admin' 
                ? 'border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20' 
                : 'border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20'
            }`}
          >
            <Shield className="h-4 w-4" />
            <span>Role: <strong className="capitalize">{role}</strong></span>
          </button>

          {/* GitHub Repo Button */}
          <a
            href="https://github.com/Bhasu333/data-observability-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-700 transition-all"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">Repo</span>
          </a>
        </div>

      </div>
    </header>
  );
}
