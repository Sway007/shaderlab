import { CstParser } from 'chevrotain';
import { ALL_RULES } from './common';
import { Keywords, Symbols, Values, Others, Types } from '../tokens';

function RulePassUniform(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Keywords.Uniform);
  this.SUBRULE($.RuleVariableType);
  // this.CONSUME(Types.glsl_mat4);
  this.CONSUME(Others.Identifier);
  this.CONSUME(Symbols.Semicolon);
}
ALL_RULES.push({ name: 'RulePassUniform', fn: RulePassUniform });

function RuleShaderPass(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Keywords.Pass);
  this.CONSUME(Values.ValueString);
  this.CONSUME(Symbols.LCurly);
  this.MANY(() => {
    this.OR([
      { ALT: () => this.SUBRULE($.RulePassUniform) },
      { ALT: () => this.SUBRULE($.RuleTag) },
      { ALT: () => this.SUBRULE($.RuleStruct) },
      { ALT: () => this.SUBRULE($.RuleFn) },
      { ALT: () => this.SUBRULE($.RuleFnVariableDeclaration) },
      { ALT: () => this.SUBRULE($.SubShaderPassPropertyAssignment) },
      { ALT: () => this.SUBRULE($.RuleRenderStateDeclaration) },
      { ALT: () => this.SUBRULE($.RuleFnMacroInclude) },
      { ALT: () => this.SUBRULE($.RuleFnMacroDefine) },
    ]);
  });
  this.CONSUME(Symbols.RCurly);
}
ALL_RULES.push({ name: 'RuleShaderPass', fn: RuleShaderPass });
