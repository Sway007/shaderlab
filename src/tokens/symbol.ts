import { createToken } from 'chevrotain';

/** { */
const LCurly = createToken({ name: 'LCurly', pattern: /\{/, label: '{' });
/** } */
const RCurly = createToken({ name: 'RCurly', pattern: /\}/, label: '}' });
/** ( */
const LBracket = createToken({ name: 'LBracket', pattern: /\(/, label: '(' });
/** ) */
const RBracket = createToken({ name: 'LBracket', pattern: /\)/, label: ')' });
/** , */
const Comma = createToken({ name: 'Comma', pattern: /,/, label: ',' });
/** : */
const Colon = createToken({ name: 'Colon', pattern: /:/, label: ':' });
/** = */
const Equal = createToken({ name: 'Equal', pattern: /=/, label: '=' });
/** ; */
const Semicolon = createToken({ name: 'Semicolon', pattern: /;/, label: ';' });
/** . */
export const Dot = createToken({ name: 'Dot', pattern: /\./, label: '.' });
const Add = createToken({ name: 'Add', pattern: /\+/, label: '+' });
const Minus = createToken({ name: 'Minus', pattern: /\-/, label: '-' });
const MultiEqual = createToken({
  name: 'MultiEqual',
  pattern: /\*=/,
  label: '*=',
});
const DivideEqual = createToken({
  name: 'DivideEqual',
  pattern: /\/=/,
  label: '/=',
});
const Mutiply = createToken({ name: 'Multiply', pattern: /\*/, label: '*' });
const Divide = createToken({ name: 'Divide', pattern: /\//, label: '/' });
export const GreaterThan = createToken({
  name: 'GreaterThan',
  pattern: /\>/,
  label: '>',
});
export const LessThan = createToken({
  name: 'LessThan',
  pattern: /\</,
  label: '<',
});

export {
  LCurly,
  RCurly,
  LBracket,
  RBracket,
  Comma,
  Colon,
  Equal,
  Semicolon,
  Add,
  Minus,
  MultiEqual,
  DivideEqual,
  Mutiply,
  Divide,
};
