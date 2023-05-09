import { createToken, ITokenConfig } from 'chevrotain';

export function createKeywordToken(k: string, opts?: Partial<ITokenConfig>) {
  return createToken({ label: k, ...opts, name: k, pattern: new RegExp(k) });
}
