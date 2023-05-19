import { ValueString } from './value';
import { createKeywordToken } from './utils';

const Shader = createKeywordToken('Shader', { longer_alt: ValueString });
const EditorProperties = createKeywordToken('EditorProperties');
const SubShader = createKeywordToken('SubShader');
const Pass = createKeywordToken('Pass');
const Tags = createKeywordToken('Tags');

export const If = createKeywordToken('if');
export const Else = createKeywordToken('else');
export const Discard = createKeywordToken('discard');
export const Void = createKeywordToken('void');
export const Return = createKeywordToken('return');

const BlendState = createKeywordToken('BlendState');
const DepthState = createKeywordToken('DepthState');
const StencilState = createKeywordToken('StencilState');
const RasterState = createKeywordToken('RasterState');

const Enabled = createKeywordToken('Enabled');
const SrcColorBlendFactor = createKeywordToken('SrcColorBlendFactor');
const DestColorBlendFactor = createKeywordToken('DestColorBlendFactor');

// tags
const ReplacementTag = createKeywordToken('ReplacementTag');
const PipelineStage = createKeywordToken('PipelineStage');
const TagKeywordsList = [ReplacementTag, PipelineStage];

const VertexShader = createKeywordToken('VertexShader');
const FragmentShader = createKeywordToken('FragmentShader');

const struct = createKeywordToken('struct');

// math
const Pow = createKeywordToken('pow');

// macro
const M_DEFINE = createKeywordToken('#define', { name: 'm_define' });
const M_IFDEF = createKeywordToken('#ifdef', { name: 'm_ifdef' });
const M_IFNDEF = createKeywordToken('#ifndef', { name: 'm_ifndef' });
const M_ELSE = createKeywordToken('#else', { name: 'm_else' });
const M_ELIF = createKeywordToken('#elif', { name: 'm_elif' });
const M_ENDIF = createKeywordToken('#endif', { name: 'm_endif' });
const M_INCLUDE = createKeywordToken('#include', { name: 'm_include' });

export {
  Shader,
  EditorProperties,
  SubShader,
  Pass,
  Tags,
  BlendState,
  DepthState,
  StencilState,
  RasterState,
  Enabled,
  DestColorBlendFactor,
  SrcColorBlendFactor,
  VertexShader,
  FragmentShader,
  TagKeywordsList,
  struct,
  Pow,
  M_ENDIF,
  M_IFNDEF,
  M_IFDEF,
  M_DEFINE,
  M_ELIF,
  M_ELSE,
  M_INCLUDE,
};
