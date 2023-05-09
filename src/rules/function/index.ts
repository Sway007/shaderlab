import { CstParser } from 'chevrotain';
import { Others, Symbols, Values } from '../../tokens';
import { ALL_RULES } from '../common';

export * from './expression';
export * from './statement';

function RuleFn(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.SUBRULE($.RuleVariableType);
  this.CONSUME1(Others.Identifier);
  this.CONSUME1(Symbols.LBracket);
  this.MANY_SEP({
    SEP: Symbols.Comma,
    DEF: () => {
      this.SUBRULE1($.RuleVariableType);
      this.CONSUME2(Others.Identifier);
    },
  });
  this.CONSUME(Symbols.RBracket);
  this.CONSUME(Symbols.LCurly);
  this.SUBRULE($.RuleFnBody);
  this.CONSUME(Symbols.RCurly);
}
ALL_RULES.push({ name: 'RuleFn', fn: RuleFn });

function RuleFnBody(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.MANY(() => {
    this.SUBRULE($.RuleFnStatement);
    this.CONSUME(Symbols.Semicolon);
  });
}
ALL_RULES.push({ name: 'RuleFnBody', fn: RuleFnBody });
