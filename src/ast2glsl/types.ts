export interface IShaderInfo {
  name: string;
  subShaders: Array<ISubShader>;
  // editorProperties:
}

export interface ISubShader {
  name: string;
  passes: Array<IShaderPass>;
  tags: IShaderTag;
}

export interface IShaderPass {
  name: string;
  vert: string;
  frag: string;
  tags?: IShaderTag;
  renderStates: IRenderState;
}

export type IShaderTag = Record<string, any>;
export type IRenderState = Record<string, any>;

export interface ILineStatement {
  line: number;
  content: string;
}

export interface IAttribute {
  content: string;
  type: string;
  variable: string;
  objVariable?: string;
  used: boolean;
}
