import { CstElement, CstNode, ICstVisitor, IToken } from 'chevrotain';

// export function extractImage(ctx?: CstNode): string | undefined {
//   if (!ctx) return undefined;
//   for (const tk in ctx.children) {
//     // @ts-ignore
//     const value = ctx.children[tk][0];
//     // @ts-ignore
//     if (value.name) return extractImage(value);
//     // @ts-ignore
//     if (value.image) return value.image;
//     continue;
//   }
//   return '';
// }

export function extractCstToken(
  ctx: CstNode | Record<string, CstNode[] | IToken[]>,
  opts?: {
    fnToken?: (element: IToken) => any;
    fnNode?: (element: CstNode) => any;
  }
): any {
  if (!ctx) return undefined;

  const obj = ctx.children ?? ctx;
  for (const tk in obj) {
    // @ts-ignore
    const value = obj[tk][0];
    // @ts-ignore
    if (value.name)
      return opts?.fnNode?.(value) ?? extractCstToken(value, opts);
    // @ts-ignore
    if (value.image) return opts?.fnToken?.(value) ?? value.image;
  }
  return undefined;
}

export function defaultVisit(
  this: ICstVisitor<any, any>,
  ctx: Record<string, Array<CstElement>>
) {
  const ret = {} as any;

  for (const k in ctx) {
    // @ts-ignore
    if (ctx[k][0].name) {
      // @ts-ignore
      ret[k] = this.visit(ctx[k]);
    } else {
      // @ts-ignore
      ret[k] = ctx[k][0].image;
    }
  }
  return ret;
}

/**
 * order not guaranteed
 */
export function extractCstString(node: CstElement): string[] {
  const ret: string[] = [];
  // @ts-ignore IToken
  if (node.image) return [node.image];
  // @ts-ignore CstNode
  if (node.name) {
    const $ = node as CstNode;
    for (const k in $.children) {
      // @ts-ignore
      const n: CstElement[] = $.children[k];
      if (!n) continue;
      for (const item of n) {
        ret.push(...extractCstString(item));
      }
    }
  }
  return ret;
}
