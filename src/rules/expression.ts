import { CstParser } from 'chevrotain';
import { Keywords, Others, Symbols, Types, Values } from '../tokens';
import { ALL_RULES } from './common';
import { ValueFloat, ValueInt } from '../tokens/value';

function RuleDeclare(this: CstParser) {
  this.OR([
    { ALT: () => this.CONSUME(Types.glsl_float) },
    { ALT: () => this.CONSUME(Types.glsl_vec2) },
    { ALT: () => this.CONSUME(Types.glsl_vec2f) },
    { ALT: () => this.CONSUME(Types.glsl_vec3) },
    { ALT: () => this.CONSUME(Types.glsl_vec3f) },
    { ALT: () => this.CONSUME(Types.glsl_vec4) },
    { ALT: () => this.CONSUME(Types.glsl_vec4f) },
    { ALT: () => this.CONSUME(Others.Identifier) },
  ]);
  this.CONSUME2(Others.Identifier);
}
ALL_RULES.push({ name: 'RuleDeclarationType', fn: RuleDeclare });

function RuleRenderStateType(this: CstParser) {
  this.OR([
    { ALT: () => this.CONSUME(Keywords.BlendState) },
    { ALT: () => this.CONSUME(Keywords.DepthState) },
    { ALT: () => this.CONSUME(Keywords.RasterState) },
    { ALT: () => this.CONSUME(Keywords.StencilState) },
  ]);
}
ALL_RULES.push({ name: 'RuleRenderStateType', fn: RuleRenderStateType });

function RuleRenderStateDeclare(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.SUBRULE($.RuleRenderStateType);
  this.CONSUME1(Others.Identifier);
  this.CONSUME(Symbols.LCurly);
  this.MANY(() => {
    this.SUBRULE($.RuleStatePropertyAssign);
  });
  this.CONSUME(Symbols.RCurly);
}
ALL_RULES.push({ name: 'RuleRenderStateDeclare', fn: RuleRenderStateDeclare });

function RuleStateProperty(this: CstParser) {
  this.OR([
    { ALT: () => this.CONSUME(Keywords.Enabled) },
    { ALT: () => this.CONSUME(Keywords.DestColorBlendFactor) },
    { ALT: () => this.CONSUME(Keywords.SrcColorBlendFactor) },
  ]);
}
ALL_RULES.push({ name: 'RuleStateProperty', fn: RuleStateProperty });

function RuleAssignableValue(this: CstParser) {
  this.OR([
    { ALT: () => this.CONSUME(Values.ValueTrue) },
    { ALT: () => this.CONSUME(Values.ValueFalse) },
    { ALT: () => this.CONSUME1(Values.ValueInt) },
    { ALT: () => this.CONSUME(Values.ValueString) },
    { ALT: () => this.CONSUME(Values.ValueFloat) },
  ]);
}
ALL_RULES.push({ name: 'RuleAssignableValue', fn: RuleAssignableValue });

function RuleStatePropertyAssign(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.MANY(() => {
    this.SUBRULE($.RuleStateProperty);
    this.CONSUME(Symbols.Equal);
    this.SUBRULE($.RuleAssignableValue);
  });
}
ALL_RULES.push({
  name: 'RuleStatePropertyAssign',
  fn: RuleStatePropertyAssign,
});

function RuleNumber(this: CstParser) {
  this.OR([
    { ALT: () => this.CONSUME1(ValueInt) },
    { ALT: () => this.CONSUME(ValueFloat) },
  ]);
}
ALL_RULES.push({ name: 'RuleNumber', fn: RuleNumber });

function RuleAddOperator(this: CstParser) {
  this.OR([
    { ALT: () => this.CONSUME(Symbols.Add) },
    { ALT: () => this.CONSUME(Symbols.Minus) },
  ]);
}
ALL_RULES.push({ name: 'RuleAddOperator', fn: RuleAddOperator });

function RuleMultiplcationOperator(this: CstParser) {
  this.OR([
    { ALT: () => this.CONSUME(Symbols.Mutiply) },
    { ALT: () => this.CONSUME(Symbols.Divide) },
  ]);
}
ALL_RULES.push({
  name: 'RuleMultiplcationOperator',
  fn: RuleMultiplcationOperator,
});

function RuleRelationOperator(this: CstParser) {
  this.OR([
    { ALT: () => this.CONSUME(Symbols.GreaterThan) },
    { ALT: () => this.CONSUME(Symbols.LessThan) },
  ]);
}
ALL_RULES.push({
  name: 'RuleRelationOperator',
  fn: RuleRelationOperator,
});
