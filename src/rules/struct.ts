import { CstParser } from 'chevrotain';
import { Keywords, Others, Symbols, Types, Values } from '../tokens';
import { ALL_RULES } from './common';

function RuleStruct(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.CONSUME(Keywords.struct);
  this.CONSUME(Others.Identifier);
  this.CONSUME(Symbols.LCurly);
  this.MANY(() => {
    this.SUBRULE($.RuleDeclarationType);
    this.CONSUME(Symbols.Semicolon);
  });
  this.CONSUME(Symbols.RCurly);
}

ALL_RULES.push({ name: 'RuleStruct', fn: RuleStruct });
