import { createToken } from 'chevrotain';

const glsl_mat2 = createToken({ name: 'glsl_mat2', pattern: /mat2/ });
const glsl_mat3 = createToken({ name: 'glsl_mat3', pattern: /mat3/ });
const glsl_mat4 = createToken({ name: 'glsl_mat4', pattern: /mat4/ });

const glsl_vec2 = createToken({ name: 'glsl_vec2', pattern: /vec2/ });
const glsl_vec3 = createToken({ name: 'glsl_vec3', pattern: /vec3/ });
const glsl_vec4 = createToken({ name: 'glsl_vec4', pattern: /vec4/ });

const glsl_ivec2 = createToken({ name: 'glsl_ivec2', pattern: /ivec2/ });
const glsl_ivec3 = createToken({ name: 'glsl_ivec3', pattern: /ivec3/ });
const glsl_ivec4 = createToken({ name: 'glsl_ivec4', pattern: /ivec4/ });

const glsl_float = createToken({ name: 'glsl_float', pattern: /float/ });
const glsl_int = createToken({ name: 'glsl_int', pattern: /int/ });

const glsl_sampler2D = createToken({
  name: 'glsl_sampler2D',
  pattern: /glsl_sampler2D/,
});

export {
  glsl_ivec2,
  glsl_ivec3,
  glsl_ivec4,
  glsl_mat2,
  glsl_mat3,
  glsl_mat4,
  glsl_vec2,
  glsl_vec3,
  glsl_vec4,
  glsl_float,
  glsl_int,
  glsl_sampler2D,
};
