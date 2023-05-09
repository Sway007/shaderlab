import { CstParser } from 'chevrotain';
import {
  EditorTypes,
  Keywords,
  Others,
  Symbols,
  Types,
  Values,
} from '../tokens';
import { ALL_RULES } from './common';

export function RuleProteryItem(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Others.Identifier);
  this.CONSUME9(Symbols.LBracket);
  this.CONSUME(Values.ValueString);
  this.CONSUME(Symbols.Comma);
  this.OR([
    {
      ALT: () => {
        this.CONSUME(EditorTypes.TypeFloat);
        this.CONSUME(Symbols.RBracket);
        this.CONSUME(Symbols.Equal);
        this.CONSUME(Values.ValueFloat);
      },
    },
    {
      ALT: () => {
        this.CONSUME(EditorTypes.TypeInteger);
        this.CONSUME1(Symbols.RBracket);
        this.CONSUME1(Symbols.Equal);
        this.CONSUME2(Values.ValueInt);
      },
    },
    {
      ALT: () => {
        this.CONSUME(EditorTypes.TypeString);
        this.CONSUME2(Symbols.RBracket);
        this.CONSUME2(Symbols.Equal);
        this.CONSUME2(Values.ValueString);
      },
    },
    {
      ALT: () => {
        this.SUBRULE($.RuleRange);
        this.CONSUME3(Symbols.RBracket);
        this.CONSUME3(Symbols.Equal);
        this.SUBRULE2($.TupleFloat2);
      },
    },
    {
      ALT: () => {
        this.CONSUME(Types.glsl_vec4);
        this.CONSUME4(Symbols.RBracket);
        this.CONSUME4(Symbols.Equal);
        this.SUBRULE($.TupleInt4);
      },
    },
    {
      ALT: () => {
        this.CONSUME(Types.glsl_vec3);
        this.CONSUME5(Symbols.RBracket);
        this.CONSUME5(Symbols.Equal);
        this.SUBRULE($.TupleInt3);
      },
    },
    {
      ALT: () => {
        this.CONSUME(Types.glsl_vec2);
        this.CONSUME6(Symbols.RBracket);
        this.CONSUME6(Symbols.Equal);
        this.SUBRULE($.TupleInt2);
      },
    },
    {
      ALT: () => {
        this.CONSUME(Types.glsl_vec4f);
        this.CONSUME8(Symbols.RBracket);
        this.CONSUME8(Symbols.Equal);
        this.SUBRULE($.TupleFloat4);
      },
    },
    {
      ALT: () => {
        this.CONSUME(Types.glsl_vec3f);
        this.CONSUME7(Symbols.RBracket);
        this.CONSUME7(Symbols.Equal);
        this.SUBRULE($.TupleFloat3);
      },
    },
  ]);
  this.CONSUME(Symbols.Semicolon);
}

ALL_RULES.push({ name: 'RuleProteryItem', fn: RuleProteryItem });

export function RuleRange(this: CstParser) {
  this.CONSUME(EditorTypes.TypeRange);
  this.CONSUME2(Symbols.LBracket);
  this.CONSUME(Values.ValueInt);
  this.CONSUME(Symbols.Comma);
  this.CONSUME1(Values.ValueInt);
}

ALL_RULES.push({ name: 'RuleRange', fn: RuleRange });

export function RuleProperty(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Keywords.EditorProperties);
  this.CONSUME(Symbols.LCurly);
  this.MANY(() => {
    this.SUBRULE($.RuleProteryItem);
  });
  this.CONSUME(Symbols.RCurly);
}

ALL_RULES.push({ name: 'RuleProperty', fn: RuleProperty });
