import { CstParser } from 'chevrotain';
import { Keywords, Others, Symbols, Types } from '../../tokens';
import { ALL_RULES } from '../common';

function RuleFnExpression(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.SUBRULE($.RuleFnAddExpr);
}
ALL_RULES.push({ name: 'RuleFnExpression', fn: RuleFnExpression });

function RuleFnAddExpr(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.SUBRULE($.RuleFnMultiplicationExpr);
  this.MANY(() => {
    this.SUBRULE($.RuleAddOperator);
    this.SUBRULE2($.RuleFnMultiplicationExpr);
  });
}
ALL_RULES.push({ name: 'RuleFnAddExpr', fn: RuleFnAddExpr });

function RuleFnMultiplicationExpr(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.SUBRULE($.RuleFnAtomicExpr);
  this.MANY(() => {
    this.SUBRULE($.RuleMultiplcationOperator);
    this.SUBRULE2($.RuleFnAtomicExpr);
  });
}
ALL_RULES.push({
  name: 'RuleFnMultiplicationExpr',
  fn: RuleFnMultiplicationExpr,
});

function RuleFnAtomicExpr(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.OR([
    { ALT: () => this.SUBRULE($.RuleFnParenthesisExpr) },
    { ALT: () => this.SUBRULE($.RuleNumber) },
    { ALT: () => this.SUBRULE($.RuleFnPowExpr) },
    { ALT: () => this.SUBRULE($.RuleFnCall) },
    { ALT: () => this.CONSUME(Keywords.Discard) },
  ]);
}
ALL_RULES.push({ name: 'RuleFnAtomicExpr', fn: RuleFnAtomicExpr });

function RuleFnParenthesisExpr(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME1(Symbols.LBracket);
  this.SUBRULE($.RuleFnAddExpr);
  this.CONSUME(Symbols.RBracket);
}
ALL_RULES.push({ name: 'RuleFnParenthesisExpr', fn: RuleFnParenthesisExpr });

function RuleFnPowExpr(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Keywords.Pow);
  this.CONSUME1(Symbols.LBracket);
  this.SUBRULE($.RuleFnAddExpr);
  this.CONSUME(Symbols.Comma);
  this.SUBRULE2($.RuleFnAddExpr);
  this.CONSUME(Symbols.RBracket);
}
ALL_RULES.push({ name: 'RuleFnPowExpr', fn: RuleFnPowExpr });

function RuleFnCall(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.OR([
    ...Object.values(Types).map((item) => ({ ALT: () => this.CONSUME(item) })),
    { ALT: () => this.CONSUME(Others.Identifier) },
  ]);
  this.CONSUME1(Symbols.LBracket);
  this.MANY_SEP({
    SEP: Symbols.Comma,
    DEF: () => {
      this.SUBRULE($.RuleAssignableValue);
    },
  });
  this.CONSUME(Symbols.RBracket);
}
ALL_RULES.push({ name: 'RuleFnCall', fn: RuleFnCall });

function RuleFnRelationExpr(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.SUBRULE($.RuleFnAddExpr);
  this.SUBRULE($.RuleRelationOperator);
  this.SUBRULE1($.RuleFnAddExpr);
}
ALL_RULES.push({ name: 'RuleFnRelationExpr', fn: RuleFnRelationExpr });
