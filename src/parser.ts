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
  Types.glsl_vec2f,
  Types.glsl_vec3f,
  Types.glsl_vec4f,
  Types.glsl_vec2,
  Types.glsl_vec3,
  Types.glsl_vec4,
  Types.glsl_float,
  Types.glsl_sampler2D,
  ...Object.values(EditorTypes),
  Others.Identifier,
];

export default class ShaderParser extends CstParser {
  lexer: Lexer;

  constructor() {
    super(allTokens, { maxLookahead: 8 });
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
