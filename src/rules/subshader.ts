import { CstParser } from 'chevrotain';
import { Symbols, Keywords, Values } from '../tokens';
import { ALL_RULES } from './common';

export function RuleSubShader(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Keywords.SubShader);
  this.CONSUME(Values.ValueString);
  this.CONSUME(Symbols.LCurly);
  this.MANY(() => {
    this.OR([
      { ALT: () => this.SUBRULE($.RuleTag) },
      { ALT: () => this.SUBRULE($.SubShaderPropertyAssignment) },
      { ALT: () => this.SUBRULE($.RuleStruct) },
      { ALT: () => this.SUBRULE($.RuleStatePropertyAssign) },
    ]);
  });
  this.CONSUME(Symbols.RCurly);
}

ALL_RULES.push({ name: 'RuleSubShader', fn: RuleSubShader });
