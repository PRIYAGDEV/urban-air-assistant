import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  RefreshCw,
  Volume2, 
  VolumeX,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { AirQualityData, UserProfile, ChatMessage } from '../types';
import { askGemini } from '../services/geminiService';

interface AIAssistantChatProps {
  airData: AirQualityData;
  profile: UserProfile;
  apiKey: string;
}

export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ airData, profile, apiKey }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello ${profile.name}. I am **AuraGuard AI**, your atmospheric health intelligence assistant.

Outdoor conditions in **${airData.city}** are currently **${airData.aqi} AQI (${airData.category})** with fine particulate (PM2.5) at **${airData.pm25} µg/m³**. ${
        airData.thermalInversionActive
          ? 'A cold boundary layer thermal inversion is currently trapping combustion exhaust close to street level.'
          : 'Particulate atmospheric dispersion is steady.'
      }

How can I assist your household right now? Feel free to ask about window ventilation timing, DIY Corsi-Rosenthal filtration, infant and asthmatic precautions, or transit exposure reduction.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const response = await askGemini(textToSend, airData, profile, apiKey);

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (voiceEnabled && 'speechSynthesis' in window) {
        const cleanSpeech = response.replace(/[#*`_]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanSpeech.slice(0, 280));
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const starterQuestions = [
    'How do I protect my asthmatic child today?',
    'Build a DIY Corsi-Rosenthal box on a low budget',
    'When is the safest time to open windows today?',
    'Is it safe to go for an outdoor walk at 7 AM?'
  ];

  return (
    <div className="cinematic-panel rounded-2xl p-5 sm:p-7 border border-white/[0.08] flex flex-col h-[650px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.07] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-obs-850 border border-white/[0.08] flex items-center justify-center text-emerald-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white font-sans">
                AuraGuard AI Atmospheric Oracle
              </h2>
              <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.08] uppercase">
                EPA / WHO Grounded
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Real-time generative reasoning conditioned on local telemetry and family profile
            </p>
          </div>
        </div>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
            voiceEnabled
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-obs-850 border-white/[0.08] text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle speech synthesis audio"
        >
          {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{voiceEnabled ? 'Voice Active' : 'Voice Muted'}</span>
        </button>
      </div>

      {/* Message Ledger */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-obs-850 border border-white/[0.08] flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-obs-950 border border-white/[0.07] text-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-line font-sans">
                {msg.content}
              </div>
              <div
                className={`text-[10px] mt-2 font-mono ${
                  msg.role === 'user' ? 'text-emerald-100 text-right' : 'text-slate-500'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-obs-800 border border-white/[0.08] flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-obs-850 border border-white/[0.08] flex items-center justify-center text-emerald-400 shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            </div>
            <div className="bg-obs-950 border border-white/[0.07] rounded-xl rounded-tl-none px-4 py-3 text-xs text-slate-400 font-mono flex items-center gap-2">
              <span>Synthesizing microclimate telemetry &amp; physiological guidelines...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts */}
      <div className="pt-2 pb-3 flex flex-wrap gap-1.5 shrink-0">
        {starterQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-[11px] font-sans px-2.5 py-1 rounded-lg bg-obs-950 border border-white/[0.08] text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-white/[0.07] shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Inquire with AuraGuard (e.g. 'How can I seal drafty windows with zero cost?')..."
          disabled={loading}
          className="flex-1 bg-obs-950 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 font-sans"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
