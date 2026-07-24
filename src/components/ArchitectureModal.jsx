import React from 'react';
import { X, Layers, Database, Activity, ShieldAlert, Cpu } from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-3xl rounded-2xl border border-slate-800 p-6 shadow-2xl bg-[#0a0e17] text-slate-200">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">System Architecture & Telemetry Dataflow</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white rounded-lg p-1 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* System Diagram Representation */}
        <div className="space-y-6 text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 flex flex-col items-center text-center">
              <Database className="h-8 w-8 text-cyan-400 mb-2" />
              <h4 className="font-bold text-white mb-1">PostgreSQL & DB Streams</h4>
              <p className="text-[11px] text-slate-400">Captures relational tables, CDC change events, and sensor payloads.</p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 flex flex-col items-center text-center">
              <Cpu className="h-8 w-8 text-blue-400 mb-2" />
              <h4 className="font-bold text-white mb-1">Ingestion & Telemetry Engine</h4>
              <p className="text-[11px] text-slate-400">Buffers telemetry stream, calculates latency SLAs & throughput.</p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-col items-center text-center">
              <ShieldAlert className="h-8 w-8 text-amber-400 mb-2" />
              <h4 className="font-bold text-white mb-1">Schema Drift Detector</h4>
              <p className="text-[11px] text-slate-400">Evaluates null rates, column type mutations, and quality bounds.</p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex flex-col items-center text-center">
              <Activity className="h-8 w-8 text-emerald-400 mb-2" />
              <h4 className="font-bold text-white mb-1">React Dashboard UI</h4>
              <p className="text-[11px] text-slate-400">Real-time Recharts visualization, RBAC controls & alert feed.</p>
            </div>

          </div>

          <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-2">
            <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px]">Key Technical Highlights</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
              <li><strong>Zero Thread Contention:</strong> Non-blocking state updates driven by React state machine hooks.</li>
              <li><strong>PostgreSQL Constraint Rules:</strong> Quality engine validates completeness, null rates, and latency thresholds.</li>
              <li><strong>Role-Based Access Control (RBAC):</strong> Switch between Admin editing privileges and Analyst read-only views.</li>
              <li><strong>Deployable to Vercel:</strong> Pure client-side static compilation with Vite for lightning fast load times.</li>
            </ul>
          </div>

        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 px-5 py-2 text-xs font-bold text-white transition-all"
          >
            Close Diagram
          </button>
        </div>

      </div>
    </div>
  );
}
