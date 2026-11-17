import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  RefreshCw,
  Volume2, 
  VolumeX
} from 'lucide-react';
import { AirQualityData, UserProfile, ChatMessage } from '../types';
import { askGemini } from '../services/geminiService';
import { logger } from '../utils/logger';

interface AIAssistantChatProps {
  airData: AirQualityData;
  profile: UserProfile;
  apiKey: string;
}

export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ airData, profile, apiKey }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
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
      logger.error('Chat error:', err);
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
    <div className="bg-white rounded-xl border border-[#DBEAFE] p-5 sm:p-7 shadow-xs flex flex-col h-[650px] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#DBEAFE] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#E9EEF6] border border-[#DBEAFE] flex items-center justify-center text-[#1E40AF]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-serif font-bold text-[#1E3A8A]">
                AuraGuard AI Atmospheric Oracle
              </h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] uppercase">
                EPA / WHO Grounded
              </span>
            </div>
            <p className="text-xs text-[#475569] font-sans mt-0.5">
              Real-time generative reasoning conditioned on local telemetry and family profile
            </p>
          </div>
        </div>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors min-h-[38px] ${
            voiceEnabled
              ? 'bg-[#1E40AF] text-white border-[#1E40AF]'
              : 'bg-[#F8FAFC] border-[#DBEAFE] text-[#475569] hover:text-[#1E3A8A]'
          }`}
          title="Toggle speech synthesis audio"
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-[#475569]" />}
          <span className="hidden sm:inline">{voiceEnabled ? 'Voice Active' : 'Voice Muted'}</span>
        </button>
      </div>

      {/* Message Ledger */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3.5 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-[#E9EEF6] border border-[#DBEAFE] flex items-center justify-center text-[#1E40AF] shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#1E40AF] text-white rounded-tr-none shadow-xs'
                  : 'bg-[#F8FAFC] border border-[#DBEAFE] text-[#1E3A8A] rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line font-sans font-medium">
                {msg.content}
              </div>
              <div
                className={`text-[10px] mt-2 font-mono ${
                  msg.role === 'user' ? 'text-blue-200 text-right' : 'text-[#64748B]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-[#1E40AF] text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-[#E9EEF6] border border-[#DBEAFE] flex items-center justify-center text-[#1E40AF] shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin text-[#1E40AF]" />
            </div>
            <div className="bg-[#F8FAFC] border border-[#DBEAFE] rounded-xl rounded-tl-none px-4 py-3 text-xs text-[#475569] font-mono flex items-center gap-2">
              <span>Synthesizing microclimate telemetry &amp; physiological guidelines...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts */}
      <div className="pt-2 pb-1 flex flex-wrap gap-2 shrink-0">
        {starterQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-xs font-sans px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#DBEAFE] text-[#1E3A8A] hover:bg-[#EFF6FF] hover:border-[#93C5FD] transition-colors"
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
        className="flex items-center gap-2 pt-2 border-t border-[#DBEAFE] shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AuraGuard (e.g. 'How can I seal drafty windows with zero cost?')..."
          disabled={loading}
          className="flex-1 bg-[#F8FAFC] border border-[#DBEAFE] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#1E3A8A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] font-sans min-h-[44px]"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-2.5 rounded-lg bg-[#1E40AF] text-white font-medium hover:bg-[#1D4ED8] disabled:opacity-40 transition-colors shadow-xs min-h-[44px] flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
