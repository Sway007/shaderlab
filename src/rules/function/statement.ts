import { CstParser } from 'chevrotain';
import { Keywords, Others, Symbols, GLKeywords } from '../../tokens';
import { ALL_RULES } from '../common';

function RuleFnVariableDeclaration(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.SUBRULE($.RuleVariableType);
  this.CONSUME(Others.Identifier);
  this.OPTION1(() => {
    this.CONSUME(Symbols.Equal);
    this.SUBRULE($.RuleFnExpression);
  });
}
ALL_RULES.push({
  name: 'RuleFnVariableDeclaration',
  fn: RuleFnVariableDeclaration,
});

function RuleFnStatement(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.OR([
    { ALT: () => this.SUBRULE($.RuleFnCall) },
    { ALT: () => this.SUBRULE($.RuleFnVariableDeclaration) },
    { ALT: () => this.SUBRULE($.RuleFnConditionStatement) },
    { ALT: () => this.SUBRULE($.RuleFnAssignStatement) },
  ]);
}
ALL_RULES.push({
  name: 'RuleFnStatement',
  fn: RuleFnStatement,
});

function RuleFnAssignStatement(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.OR([
    ...Object.values(GLKeywords).map((item) => ({
      ALT: () => this.CONSUME(item),
    })),
    { ALT: () => this.CONSUME(Others.Identifier) },
  ]);
  this.CONSUME(Symbols.Equal);
  this.SUBRULE($.RuleFnExpression);
}
ALL_RULES.push({
  name: 'RuleFnAssignStatement',
  fn: RuleFnAssignStatement,
});

function RuleFnBlockStatement(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Symbols.LCurly);
  this.SUBRULE($.RuleFnBody);
  this.CONSUME(Symbols.RCurly);
}
ALL_RULES.push({ name: 'RuleFnBlockStatement', fn: RuleFnBlockStatement });

function RuleFnConditionStatement(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Keywords.If);
  this.CONSUME1(Symbols.LBracket);
  this.SUBRULE($.RuleFnRelationExpr);
  this.CONSUME(Symbols.RBracket);
  this.OPTION(() => {
    this.MANY(() => {
      this.CONSUME(Keywords.Else);
      this.CONSUME1(Keywords.If);
      this.SUBRULE($.RuleFnBlockStatement);
    });
  });
  this.OPTION1(() => {
    this.CONSUME1(Keywords.Else);
    this.SUBRULE1($.RuleFnBlockStatement);
  });
}
ALL_RULES.push({
  name: 'RuleFnConditionStatement',
  fn: RuleFnConditionStatement,
});
