import { createToken } from 'chevrotain';

const ValueInt = createToken({ name: 'ValueInt', pattern: /-?\d+/ });
const ValueFloat = createToken({ name: 'ValueInt', pattern: /-?\d+\.\d+/ });
const ValueString = createToken({ name: 'ValueString', pattern: /"(\w|\s)*"/ });
const ValueTrue = createToken({ name: 'ValueTrue', pattern: /true/ });
const ValueFalse = createToken({ name: 'ValueFalse', pattern: /false/ });

export { ValueFloat, ValueInt, ValueString, ValueTrue, ValueFalse };
