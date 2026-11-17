import { describe, it, expect, vi } from 'vitest';
import { logger } from '../logger';

describe('logger utility — Environment Isolation', () => {
  it('exposes standard console logging signatures safely', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    logger.log('test log');
    logger.warn('test warning');
    logger.error('test error');

    expect(typeof logger.log).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');

    logSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
