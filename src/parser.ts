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
import { defineConfig, IConfig, config } from './ast2glsl';

const allTokens = [
  Others.WhiteSpace,
  Others.CommnetLine,
  Others.CommentMultiLine,
  ...Symbols.tokenList,
  ...Object.values(Keywords).flat(),
  ...Object.values(Values),
  ...Object.values(Types),
  // Types.glsl_vec2,
  // Types.glsl_vec3,
  // Types.glsl_vec4,
  // Types.glsl_ivec2,
  // Types.glsl_ivec3,
  // Types.glsl_ivec4,
  // Types.glsl_float,
  // Types.glsl_sampler2D,

  ...Object.values(EditorTypes),
  Others.Identifier,
];

export default class ShaderParser extends CstParser {
  lexer: Lexer;

  constructor(config?: Partial<IConfig>) {
    defineConfig(config);

    super(allTokens, { maxLookahead: 8 });
    this.lexer = new Lexer(allTokens);
    ALL_RULES.forEach((rule) => {
      this.RULE(rule.name, rule.fn.bind(this));
    });
    this.performSelfAnalysis();
  }

  parse(text: string) {
    if (config.parseInclude) {
      text = config.parseInclude(text);
    } else {
      const regex = /^[ \t]*#include +"([\w\d.]+)"/gm;
      text = text.replace(regex, (_, name) => {
        return config.include!(name);
      });
    }
    // console.log('text: ', text);

    const lexingResult = this.lexer.tokenize(text);
    this.input = lexingResult.tokens;
  }
}
