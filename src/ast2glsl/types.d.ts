interface IShaderInfo {
  name: string;
  subShaders: Array<ISubShader>;
  // editorProperties:
}

interface ISubShader {
  name: string;
  passes: Array<IShaderPass>;
  tags: IShaderTag;
}

interface IShaderPass {
  name: string;
  vert: string;
  frag: string;
  tags?: IShaderTag;
  renderStates: IRenderState;
}

type IShaderTag = Record<string, any>;
type IRenderState = Record<string, any>;

interface ILineStatement {
  line: number;
  content: string;
}

interface IAttribute {
  content: string;
  type: string;
  variable: string;
  objVariable?: string;
}
