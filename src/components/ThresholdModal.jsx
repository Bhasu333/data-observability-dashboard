import React, { useState } from 'react';
import { X, Sliders, Check } from 'lucide-react';

export default function ThresholdModal({ isOpen, onClose, thresholds, onSave, role }) {
  const [latencyLimit, setLatencyLimit] = useState(thresholds.latencyLimit || 100);
  const [nullLimit, setNullLimit] = useState(thresholds.nullLimit || 2.0);
  const [healthScoreLimit, setHealthScoreLimit] = useState(thresholds.healthScoreLimit || 90.0);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      latencyLimit: Number(latencyLimit),
      nullLimit: Number(nullLimit),
      healthScoreLimit: Number(healthScoreLimit),
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-md rounded-2xl border border-slate-800 p-6 shadow-2xl bg-[#0f172a]">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Alert Threshold Configuration</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white rounded-lg p-1 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {role !== 'admin' && (
          <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-300">
            <strong>Analyst Mode:</strong> Thresholds are read-only. Switch role to <strong>Admin</strong> in the header to modify.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Max Ingestion Latency SLA (ms):
            </label>
            <input 
              type="number"
              value={latencyLimit}
              onChange={(e) => setLatencyLimit(e.target.value)}
              disabled={role !== 'admin'}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 py-2 px-3 text-slate-100 font-mono focus:border-cyan-500 focus:outline-none disabled:opacity-50"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Triggers Warning Alert when exceeded.</span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Max Allowed NULL Column Rate (%):
            </label>
            <input 
              type="number"
              step="0.1"
              value={nullLimit}
              onChange={(e) => setNullLimit(e.target.value)}
              disabled={role !== 'admin'}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 py-2 px-3 text-slate-100 font-mono focus:border-cyan-500 focus:outline-none disabled:opacity-50"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Triggers Schema Drift Alert if breached.</span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Min Pipeline Health Score (%):
            </label>
            <input 
              type="number"
              step="0.5"
              value={healthScoreLimit}
              onChange={(e) => setHealthScoreLimit(e.target.value)}
              disabled={role !== 'admin'}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 py-2 px-3 text-slate-100 font-mono focus:border-cyan-500 focus:outline-none disabled:opacity-50"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">SLA baseline threshold.</span>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-slate-400 hover:text-white font-medium"
            >
              Cancel
            </button>
            {role === 'admin' && (
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-4 py-2 font-bold text-black transition-all"
              >
                {saved ? <Check className="h-4 w-4" /> : null}
                {saved ? 'Saved!' : 'Save Settings'}
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
