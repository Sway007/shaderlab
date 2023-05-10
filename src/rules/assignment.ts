import { CstParser, TokenType } from 'chevrotain';
import { Keywords, Others, Symbols } from '../tokens';
import { ALL_RULES } from './common';

function SubShaderPassPropertyAssignment(this: CstParser) {
  const $ = this as any as IShaderParser;

  this.OR([
    { ALT: () => this.SUBRULE($.RuleRenderStateType) },
    { ALT: () => this.CONSUME(Keywords.VertexShader) },
    { ALT: () => this.CONSUME(Keywords.FragmentShader) },
  ]);

  this.CONSUME(Symbols.Equal);
  this.CONSUME(Others.Identifier);
}
ALL_RULES.push({
  name: 'SubShaderPassPropertyAssignment',
  fn: SubShaderPassPropertyAssignment,
});
