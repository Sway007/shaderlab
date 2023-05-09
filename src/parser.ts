import { CstParser, Lexer } from 'chevrotain';
import {
  Others,
  Symbols,
  Types,
  EditorTypes,
  Keywords,
  Values,
} from './tokens';
import { ALL_RULES } from './rules';

const allTokens = [
  Others.WhiteSpace,
  Others.CommnetLine,
  Others.CommentMultiLine,
  ...Object.values(Symbols),
  ...Object.values(Keywords).flat(),
  ...Object.values(Values),
  ...Object.values(Types).flat(),
  ...Object.values(EditorTypes),
  Others.Identifier,
];

export default class ShaderParser extends CstParser {
  lexer: Lexer;

  constructor() {
    super(allTokens);
    this.lexer = new Lexer(allTokens);
    ALL_RULES.forEach((rule) => {
      this.RULE(rule.name, rule.fn.bind(this));
    });
    this.performSelfAnalysis();
  }

  parse(text: string) {
    const lexingResult = this.lexer.tokenize(text);
    this.input = lexingResult.tokens;
  }
}
