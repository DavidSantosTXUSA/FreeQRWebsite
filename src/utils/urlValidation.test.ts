import { describe, expect, it } from 'vitest';
import { getURLValidationError, validateURL } from './urlValidation';

describe('validateURL', () => {
  it('returns true for fully qualified URLs', () => {
    expect(validateURL('https://aws.amazon.com')).toBe(true);
    expect(validateURL('http://example.org')).toBe(true);
  });

  it('handles URLs without protocol by prepending https', () => {
    expect(validateURL('cloudclub.org/join')).toBe(true);
    expect(validateURL('www.example.com')).toBe(true);
  });

  it('rejects empty or whitespace-only values', () => {
    expect(validateURL('')).toBe(false);
    expect(validateURL('   ')).toBe(false);
  });

  it('rejects clearly invalid URLs', () => {
    expect(validateURL('nota url')).toBe(false);
    expect(validateURL('http://')).toBe(false);
  });
});

describe('getURLValidationError', () => {
  it('returns prompt to enter URL when empty', () => {
    expect(getURLValidationError('')).toBe('Please enter a URL');
  });

  it('returns generic invalid message otherwise', () => {
    expect(getURLValidationError('not-a-url')).toBe('Please enter a valid URL (e.g., https://example.com)');
  });
});


