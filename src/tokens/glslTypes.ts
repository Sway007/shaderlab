import { createToken } from 'chevrotain';

const glsl_vec2f = createToken({ name: 'glsl_vec2f', pattern: /vec2f/ });
const glsl_vec3f = createToken({ name: 'glsl_vec3f', pattern: /vec3f/ });
const glsl_vec4f = createToken({ name: 'glsl_vec4f', pattern: /vec4f/ });

const glsl_vec2 = createToken({ name: 'glsl_vec2', pattern: /vec2/ });
const glsl_vec3 = createToken({ name: 'glsl_vec3', pattern: /vec3/ });
const glsl_vec4 = createToken({ name: 'glsl_vec4', pattern: /vec4/ });

const glsl_float = createToken({ name: 'glsl_float', pattern: /float/ });

const glsl_sampler2D = createToken({
  name: 'glsl_sampler2D',
  pattern: /glsl_sampler2D/,
});

export {
  glsl_vec2f,
  glsl_vec3f,
  glsl_vec4f,
  glsl_vec2,
  glsl_vec3,
  glsl_vec4,
  glsl_float,
  glsl_sampler2D,
};
