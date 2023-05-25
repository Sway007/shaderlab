import { CstParser } from 'chevrotain';
import { ALL_RULES } from './common';
import { Keywords, Symbols, Values } from '../tokens';

export function RuleShaderPass(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Keywords.Pass);
  this.CONSUME(Values.ValueString);
  this.CONSUME(Symbols.LCurly);
  this.MANY(() => {
    this.OR([
      { ALT: () => this.SUBRULE($.RuleFn) },
      { ALT: () => this.SUBRULE($.RuleFnVariableDeclaration) },
      { ALT: () => this.SUBRULE($.RuleTag) },
      { ALT: () => this.SUBRULE($.RuleStruct) },
      { ALT: () => this.SUBRULE($.SubShaderPassPropertyAssignment) },
      { ALT: () => this.SUBRULE($.RuleRenderStateDeclaration) },
    ]);
  });
  this.CONSUME(Symbols.RCurly);
}
ALL_RULES.push({ name: 'RuleShaderPass', fn: RuleShaderPass });
