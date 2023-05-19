import { CstParser } from 'chevrotain';
import { Keywords, Others, Values } from '../../tokens';
import { ALL_RULES } from '../common';

function RuleFnMacro(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.OR([
    { ALT: () => this.SUBRULE($.RuleFnMacroDefine) },
    { ALT: () => this.SUBRULE($.RuleFnMacroInclude) },
    { ALT: () => this.SUBRULE($.RuleFnMacroCondition) },
  ]);
}
ALL_RULES.push({ name: 'RuleFnMacro', fn: RuleFnMacro });

function RuleFnMacroCondition(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.SUBRULE($.RuleFnMacroConditionDeclare);
  this.CONSUME(Others.Identifier);
  this.SUBRULE($.RuleFnBody);
  this.OPTION(() => {
    this.SUBRULE($.RuleFnMacroConditionBranch);
  });
  this.OPTION1(() => {
    this.SUBRULE1($.RuleFnBody);
  });
  this.CONSUME(Keywords.M_ENDIF);
}
ALL_RULES.push({ name: 'RuleFnMacroCondition', fn: RuleFnMacroCondition });

function RuleFnMacroConditionBranch(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.SUBRULE($.RuleFnMacroConditionBranchDeclare);
  this.SUBRULE($.RuleFnBody);
}
ALL_RULES.push({
  name: 'RuleFnMacroConditionBranch',
  fn: RuleFnMacroConditionBranch,
});

function RuleFnMacroConditionBranchDeclare(this: CstParser) {
  this.OR([{ ALT: () => this.CONSUME(Keywords.M_ELSE) }]);
}
ALL_RULES.push({
  name: 'RuleFnMacroConditionBranchDeclare',
  fn: RuleFnMacroConditionBranchDeclare,
});

function RuleFnMacroConditionDeclare(this: CstParser) {
  this.OR([
    { ALT: () => this.CONSUME(Keywords.M_IFDEF) },
    { ALT: () => this.CONSUME(Keywords.M_IFNDEF) },
  ]);
}
ALL_RULES.push({
  name: 'RuleFnMacroConditionDeclare',
  fn: RuleFnMacroConditionDeclare,
});

function RuleFnMacroDefine(this: CstParser) {
  this.CONSUME(Keywords.M_DEFINE);
  this.CONSUME(Others.Identifier);
}
ALL_RULES.push({ name: 'RuleFnMacroDefine', fn: RuleFnMacroDefine });

function RuleFnMacroInclude(this: CstParser) {
  this.CONSUME(Keywords.M_INCLUDE);
  this.CONSUME(Values.ValueString);
}
ALL_RULES.push({ name: 'RuleFnMacroInclude', fn: RuleFnMacroInclude });
