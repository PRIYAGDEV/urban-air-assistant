import React, { useState } from 'react';
import { Key, X, ExternalLink, Check } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  currentKey,
  onSaveKey,
}) => {
  const [val, setVal] = useState(currentKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(val);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setVal('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="cinematic-panel rounded-2xl p-6 max-w-md w-full border border-white/[0.08] shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-obs-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-obs-850 border border-white/[0.08] flex items-center justify-center text-emerald-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white font-sans">
              Google Gemini Live API Credentials
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Direct client connection to Gemini 2.5 Flash
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
          AuraGuard includes a built-in deterministic intelligence engine that runs 100% locally without external keys. To enable live unrestricted generative AI reasoning, enter your free Google AI Studio key below.
        </p>

        <div className="space-y-3 mb-5">
          <input
            type="password"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-obs-950 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 font-mono"
          />

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Stored in local browser storage only</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              Get Free Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/[0.07]">
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors"
          >
            Clear Stored Key
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono bg-obs-850 text-slate-300 hover:bg-obs-800 border border-white/[0.08]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-1.5 shadow-sm"
            >
              {saved && <Check className="w-3.5 h-3.5" />}
              <span>{saved ? 'Saved' : 'Save Key'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
