import { CstNode } from 'chevrotain';

export function extractImage(ctx: CstNode): string {
  for (const tk in ctx.children) {
    // @ts-ignore
    const value = ctx.children[tk][0];
    // @ts-ignore
    if (value.name) return extractImage(value);
    // @ts-ignore
    if (value.image) return value.image;
    continue;
  }
  throw 'no image';
}
