import { createToken } from 'chevrotain';

export const glsl_vec2f = createToken({ name: 'glsl_vec2f', pattern: /vec2f/ });
export const glsl_vec3f = createToken({ name: 'glsl_vec3f', pattern: /vec3f/ });
export const glsl_vec4f = createToken({ name: 'glsl_vec4f', pattern: /vec4f/ });

export const glsl_vec2 = createToken({ name: 'glsl_vec2', pattern: /vec2/ });
export const glsl_vec3 = createToken({ name: 'glsl_vec3', pattern: /vec3/ });
export const glsl_vec4 = createToken({ name: 'glsl_vec4', pattern: /vec4/ });

export const glsl_float = createToken({ name: 'glsl_float', pattern: /float/ });

export const glsl_sampler2D = createToken({
  name: 'glsl_sampler2D',
  pattern: /glsl_sampler2D/,
});
