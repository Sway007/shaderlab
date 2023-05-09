import { Lexer, createToken } from 'chevrotain';

const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-z]\w*/ });

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /(\s|\n)+/,
  group: Lexer.SKIPPED,
});

const CommnetLine = createToken({
  name: 'CommnetLine',
  pattern: /\/\/.*\n/,
  group: Lexer.SKIPPED,
});

const CommentMultiLine = createToken({
  name: 'CommentMultiLine',
  pattern: /\/\*.*?\*\//,
  group: Lexer.SKIPPED,
});

export { Identifier, WhiteSpace, CommnetLine, CommentMultiLine };
