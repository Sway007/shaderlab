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

const Include = createKeywordToken('Include', { pattern: /#include/ });

const struct = createKeywordToken('struct');

// math
const Pow = createKeywordToken('pow');

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
  Include,
  struct,
  Pow,
};
