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
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full border border-[#DBEAFE] shadow-xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#475569] hover:text-[#1E3A8A] p-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors"
          aria-label="Close credentials modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#E9EEF6] border border-[#DBEAFE] flex items-center justify-center text-[#1E40AF]">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-[#1E3A8A]">
              Google Gemini Live API Credentials
            </h3>
            <p className="text-xs text-[#475569] font-mono">
              Direct client connection to Gemini 2.5 Flash
            </p>
          </div>
        </div>

        <p className="text-xs text-[#475569] leading-relaxed mb-4 font-sans">
          AuraGuard includes a deterministic intelligence engine that runs 100% locally without external keys. To enable live unrestricted generative AI reasoning, enter your free Google AI Studio key below.
        </p>

        <div className="space-y-3 mb-5">
          <input
            type="password"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-[#F8FAFC] border border-[#DBEAFE] focus:border-[#3B82F6] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#1E3A8A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] font-mono"
          />

          <div className="flex items-center justify-between text-xs text-[#475569] font-mono">
            <span>Stored in local browser storage only</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E40AF] hover:underline flex items-center gap-1 font-semibold"
            >
              Get Free Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#DBEAFE]">
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-2 rounded-lg text-xs font-mono text-[#64748B] hover:text-[#DC2626] transition-colors"
          >
            Clear Stored Key
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E8F0] border border-[#DBEAFE]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-[#1E40AF] text-white hover:bg-[#1D4ED8] flex items-center gap-1.5 shadow-xs"
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
