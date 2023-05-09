import { CstParser } from 'chevrotain';
import { Symbols, Keywords, Values } from '../tokens';
import { ALL_RULES } from './common';

export function RuleTag(this: CstParser) {
  this.CONSUME(Keywords.Tags);
  this.CONSUME(Symbols.LCurly);
  this.MANY(() => {
    this.OR(
      Keywords.TagKeywordsList.map((kw) => ({
        ALT: () => this.CONSUME(kw),
      }))
    );
    this.CONSUME(Symbols.Equal);
    this.CONSUME(Values.ValueString);
  });
  this.CONSUME(Symbols.RCurly);
}

ALL_RULES.push({ name: 'RuleTag', fn: RuleTag });
