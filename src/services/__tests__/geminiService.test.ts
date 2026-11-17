import { describe, it, expect } from 'vitest';
import { askGemini } from '../geminiService';
import { getFallbackData, CITY_PRESETS } from '../airQualityService';
import { UserProfile } from '../../types';

describe('geminiService — Empathetic Assistant & Fallback Heuristics', () => {
  const city = CITY_PRESETS[0]; // Delhi NCR
  const airData = getFallbackData(city);
  const profile: UserProfile = {
    name: 'Priyag & Family',
    householdType: 'family_with_infants',
    vulnerability: 'asthma',
    housingType: 'standard_apartment_drafty',
    socioeconomicTier: 'tier2_low_cost',
    commuteMode: 'two_wheeler_motorcycle',
    cookingFuel: 'lpg_piped',
    hasPurifier: false
  };

  it('answers ventilation questions with local solar window and scientific rationale', async () => {
    const response = await askGemini('When should I open my windows today for fresh air?', airData, profile);
    expect(response).toContain('Smart Ventilation Timing');
    expect(response).toContain(airData.optimalVentilationWindow.start);
    expect(response).toContain(airData.optimalVentilationWindow.end);
    expect(response).toContain('Solar radiation');
  });

  it('answers DIY hacks questions with Corsi-Rosenthal guidance and zero-cost strategies', async () => {
    const response = await askGemini('What are some cheap DIY air purifier hacks?', airData, profile);
    expect(response).toContain('Low-Cost & DIY Clean Air Strategies');
    expect(response).toContain('Corsi-Rosenthal DIY Box');
    expect(response).toContain('Damp-Cloth Infiltration Barrier');
  });

  it('answers health & asthma questions with clinical boundary disclaimers', async () => {
    const response = await askGemini('My child has asthma and is coughing, what should I do?', airData, profile);
    expect(response).toContain('Protecting High-Risk Individuals (ASTHMA)');
    expect(response).toContain('Notice: This is environmental exposure guidance');
  });

  it('answers commute protection queries with mode-specific advice', async () => {
    const response = await askGemini('How can I protect myself during morning commute?', airData, profile);
    expect(response).toContain('Personalized Smog Mitigation Plan');
    expect(response).toContain('two wheeler motorcycle');
    expect(response).toContain('N95/FFP2 respirator');
  });

  it('handles general fallback queries with structured Markdown action plans', async () => {
    const response = await askGemini('What should I do right now to protect my home?', airData, profile);
    expect(response).toContain('Personalized Smog Mitigation Plan for Priyag & Family');
    expect(response).toContain(profile.name);
    expect(response).toContain('Indoor Sanctuary');
  });
});
