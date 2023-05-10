import type { CstNode, ICstVisitor, IToken } from 'chevrotain';

export interface RuleShaderCstNode extends CstNode {
  name: 'RuleShader';
  children: RuleShaderCstChildren;
}

export type RuleShaderCstChildren = {
  Shader: IToken[];
  ValueString: IToken[];
  LCurly: IToken[];
  RuleProperty?: RulePropertyCstNode[];
  RuleSubShader?: RuleSubShaderCstNode[];
  RCurly: IToken[];
};

export interface RuleSubShaderCstNode extends CstNode {
  name: 'RuleSubShader';
  children: RuleSubShaderCstChildren;
}

export type RuleSubShaderCstChildren = {
  SubShader: IToken[];
  ValueString: IToken[];
  LCurly: IToken[];
  RuleShaderPass?: RuleShaderPassCstNode[];
  RuleTag?: RuleTagCstNode[];
  RuleRenderStateDeclaration?: RuleRenderStateDeclarationCstNode[];
  RCurly: IToken[];
};

export interface RuleShaderPassCstNode extends CstNode {
  name: 'RuleShaderPass';
  children: RuleShaderPassCstChildren;
}

export type RuleShaderPassCstChildren = {
  Pass: IToken[];
  ValueString: IToken[];
  LCurly: IToken[];
  RuleFn?: RuleFnCstNode[];
  RuleFnVariableDeclaration?: RuleFnVariableDeclarationCstNode[];
  RuleTag?: RuleTagCstNode[];
  RuleStruct?: RuleStructCstNode[];
  SubShaderPassPropertyAssignment?: SubShaderPassPropertyAssignmentCstNode[];
  RuleRenderStateDeclaration?: RuleRenderStateDeclarationCstNode[];
  Semicolon?: IToken[];
  RCurly: IToken[];
};

export interface RuleProteryItemCstNode extends CstNode {
  name: 'RuleProteryItem';
  children: RuleProteryItemCstChildren;
}

export type RuleProteryItemCstChildren = {
  Identifier: IToken[];
  LBracket: IToken[];
  ValueString: IToken[];
  Comma: IToken[];
  RulePropertyItemType: RulePropertyItemTypeCstNode[];
  Equal: IToken[];
  RulePropertyItemValue: RulePropertyItemValueCstNode[];
  Semicolon: IToken[];
};

export interface RulePropertyItemTypeCstNode extends CstNode {
  name: 'RulePropertyItemType';
  children: RulePropertyItemTypeCstChildren;
}

export type RulePropertyItemTypeCstChildren = {
  TypeInteger?: IToken[];
  TypeString?: IToken[];
  TypeFloat?: IToken[];
  RuleVariableType?: RuleVariableTypeCstNode[];
  RuleRange?: RuleRangeCstNode[];
};

export interface RulePropertyItemValueCstNode extends CstNode {
  name: 'RulePropertyItemValue';
  children: RulePropertyItemValueCstChildren;
}

export type RulePropertyItemValueCstChildren = {
  TupleFloat4?: TupleFloat4CstNode[];
  TupleFloat3?: TupleFloat3CstNode[];
  TupleFloat2?: TupleFloat2CstNode[];
  TupleInt4?: TupleInt4CstNode[];
  TupleInt3?: TupleInt3CstNode[];
  TupleInt2?: TupleInt2CstNode[];
  ValueTrue?: IToken[];
  ValueFalse?: IToken[];
  ValueInt?: IToken[];
  ValueString?: IToken[];
  ValueFloat?: IToken[];
};

export interface RuleRangeCstNode extends CstNode {
  name: 'RuleRange';
  children: RuleRangeCstChildren;
}

export type RuleRangeCstChildren = {
  Range: IToken[];
  LBracket: IToken[];
  ValueInt: IToken[];
  Comma: IToken[];
};

export interface RulePropertyCstNode extends CstNode {
  name: 'RuleProperty';
  children: RulePropertyCstChildren;
}

export type RulePropertyCstChildren = {
  EditorProperties: IToken[];
  LCurly: IToken[];
  RuleProteryItem?: RuleProteryItemCstNode[];
  RCurly: IToken[];
};

export interface TupleInt2CstNode extends CstNode {
  name: 'TupleInt2';
  children: TupleInt2CstChildren;
}

export type TupleInt2CstChildren = {
  LBracket: IToken[];
  ValueInt: IToken[];
  Comma: IToken[];
};

export interface TupleInt3CstNode extends CstNode {
  name: 'TupleInt3';
  children: TupleInt3CstChildren;
}

export type TupleInt3CstChildren = {
  LBracket: IToken[];
  ValueInt: IToken[];
  Comma: IToken[];
};

export interface TupleInt4CstNode extends CstNode {
  name: 'TupleInt4';
  children: TupleInt4CstChildren;
}

export type TupleInt4CstChildren = {
  LBracket: IToken[];
  ValueInt: IToken[];
  Comma: IToken[];
};

export interface TupleFloat2CstNode extends CstNode {
  name: 'TupleFloat2';
  children: TupleFloat2CstChildren;
}

export type TupleFloat2CstChildren = {
  LBracket: IToken[];
  ValueFloat: IToken[];
  Comma: IToken[];
};

export interface TupleFloat3CstNode extends CstNode {
  name: 'TupleFloat3';
  children: TupleFloat3CstChildren;
}

export type TupleFloat3CstChildren = {
  LBracket: IToken[];
  ValueFloat: IToken[];
  Comma: IToken[];
};

export interface TupleFloat4CstNode extends CstNode {
  name: 'TupleFloat4';
  children: TupleFloat4CstChildren;
}

export type TupleFloat4CstChildren = {
  LBracket: IToken[];
  ValueFloat: IToken[];
  Comma: IToken[];
};

export interface RuleTagCstNode extends CstNode {
  name: 'RuleTag';
  children: RuleTagCstChildren;
}

export type RuleTagCstChildren = {
  Tags: IToken[];
  LCurly: IToken[];
  ReplacementTag?: IToken[];
  PipelineStage?: IToken[];
  Equal?: IToken[];
  ValueString?: IToken[];
  RCurly: IToken[];
};

export interface SubShaderPassPropertyAssignmentCstNode extends CstNode {
  name: 'SubShaderPassPropertyAssignment';
  children: SubShaderPassPropertyAssignmentCstChildren;
}

export type SubShaderPassPropertyAssignmentCstChildren = {
  RuleRenderStateType?: RuleRenderStateTypeCstNode[];
  VertexShader?: IToken[];
  FragmentShader?: IToken[];
  Equal: IToken[];
  Identifier: IToken[];
};

export interface RuleStructCstNode extends CstNode {
  name: 'RuleStruct';
  children: RuleStructCstChildren;
}

export type RuleStructCstChildren = {
  struct: IToken[];
  Identifier: IToken[];
  LCurly: IToken[];
  RuleDeclarationType?: RuleDeclarationTypeCstNode[];
  Semicolon?: IToken[];
  RCurly: IToken[];
};

export interface RuleDeclarationTypeCstNode extends CstNode {
  name: 'RuleDeclarationType';
  children: RuleDeclarationTypeCstChildren;
}

export type RuleDeclarationTypeCstChildren = {
  glsl_float?: IToken[];
  glsl_vec2?: IToken[];
  glsl_vec2f?: IToken[];
  glsl_vec3?: IToken[];
  glsl_vec3f?: IToken[];
  glsl_vec4?: IToken[];
  glsl_vec4f?: IToken[];
  Identifier: IToken[];
};

export interface RuleRenderStateTypeCstNode extends CstNode {
  name: 'RuleRenderStateType';
  children: RuleRenderStateTypeCstChildren;
}

export type RuleRenderStateTypeCstChildren = {
  BlendState?: IToken[];
  DepthState?: IToken[];
  RasterState?: IToken[];
  StencilState?: IToken[];
};

export interface RuleStatePropertyCstNode extends CstNode {
  name: 'RuleStateProperty';
  children: RuleStatePropertyCstChildren;
}

export type RuleStatePropertyCstChildren = {
  Enabled?: IToken[];
  DestColorBlendFactor?: IToken[];
  SrcColorBlendFactor?: IToken[];
};

export interface RuleAssignableValueCstNode extends CstNode {
  name: 'RuleAssignableValue';
  children: RuleAssignableValueCstChildren;
}

export type RuleAssignableValueCstChildren = {
  ValueTrue?: IToken[];
  ValueFalse?: IToken[];
  ValueInt?: IToken[];
  ValueString?: IToken[];
  ValueFloat?: IToken[];
  RuleFnCall?: RuleFnCallCstNode[];
  Identifier?: IToken[];
};

export interface RuleRenderStateDeclarationCstNode extends CstNode {
  name: 'RuleRenderStateDeclaration';
  children: RuleRenderStateDeclarationCstChildren;
}

export type RuleRenderStateDeclarationCstChildren = {
  RuleRenderStateType: RuleRenderStateTypeCstNode[];
  Identifier: IToken[];
  LCurly: IToken[];
  RuleStatePropertyAssign?: RuleStatePropertyAssignCstNode[];
  Semicolon?: IToken[];
  RCurly: IToken[];
};

export interface RuleStatePropertyAssignCstNode extends CstNode {
  name: 'RuleStatePropertyAssign';
  children: RuleStatePropertyAssignCstChildren;
}

export type RuleStatePropertyAssignCstChildren = {
  RuleStateProperty: RuleStatePropertyCstNode[];
  Equal: IToken[];
  RuleAssignableValue: RuleAssignableValueCstNode[];
};

export interface RuleNumberCstNode extends CstNode {
  name: 'RuleNumber';
  children: RuleNumberCstChildren;
}

export type RuleNumberCstChildren = {
  ValueInt?: IToken[];
  ValueFloat?: IToken[];
};

export interface RuleAddOperatorCstNode extends CstNode {
  name: 'RuleAddOperator';
  children: RuleAddOperatorCstChildren;
}

export type RuleAddOperatorCstChildren = {
  Add?: IToken[];
  Minus?: IToken[];
};

export interface RuleMultiplcationOperatorCstNode extends CstNode {
  name: 'RuleMultiplcationOperator';
  children: RuleMultiplcationOperatorCstChildren;
}

export type RuleMultiplcationOperatorCstChildren = {
  Multiply?: IToken[];
  Divide?: IToken[];
};

export interface RuleRelationOperatorCstNode extends CstNode {
  name: 'RuleRelationOperator';
  children: RuleRelationOperatorCstChildren;
}

export type RuleRelationOperatorCstChildren = {
  GreaterThan?: IToken[];
  LessThan?: IToken[];
};

export interface RuleFnExpressionCstNode extends CstNode {
  name: 'RuleFnExpression';
  children: RuleFnExpressionCstChildren;
}

export type RuleFnExpressionCstChildren = {
  RuleFnAddExpr: RuleFnAddExprCstNode[];
};

export interface RuleFnAddExprCstNode extends CstNode {
  name: 'RuleFnAddExpr';
  children: RuleFnAddExprCstChildren;
}

export type RuleFnAddExprCstChildren = {
  RuleFnMultiplicationExpr: RuleFnMultiplicationExprCstNode[];
  RuleAddOperator?: RuleAddOperatorCstNode[];
};

export interface RuleFnMultiplicationExprCstNode extends CstNode {
  name: 'RuleFnMultiplicationExpr';
  children: RuleFnMultiplicationExprCstChildren;
}

export type RuleFnMultiplicationExprCstChildren = {
  RuleFnAtomicExpr: RuleFnAtomicExprCstNode[];
  RuleMultiplcationOperator?: RuleMultiplcationOperatorCstNode[];
};

export interface RuleFnAtomicExprCstNode extends CstNode {
  name: 'RuleFnAtomicExpr';
  children: RuleFnAtomicExprCstChildren;
}

export type RuleFnAtomicExprCstChildren = {
  RuleFnParenthesisExpr?: RuleFnParenthesisExprCstNode[];
  RuleNumber?: RuleNumberCstNode[];
  RuleFnPowExpr?: RuleFnPowExprCstNode[];
  RuleFnCall?: RuleFnCallCstNode[];
  discard?: IToken[];
};

export interface RuleFnParenthesisExprCstNode extends CstNode {
  name: 'RuleFnParenthesisExpr';
  children: RuleFnParenthesisExprCstChildren;
}

export type RuleFnParenthesisExprCstChildren = {
  LBracket: IToken[];
  RuleFnAddExpr: RuleFnAddExprCstNode[];
};

export interface RuleFnPowExprCstNode extends CstNode {
  name: 'RuleFnPowExpr';
  children: RuleFnPowExprCstChildren;
}

export type RuleFnPowExprCstChildren = {
  pow: IToken[];
  LBracket: IToken[];
  RuleFnAddExpr: RuleFnAddExprCstNode[];
  Comma: IToken[];
};

export interface RuleFnCallCstNode extends CstNode {
  name: 'RuleFnCall';
  children: RuleFnCallCstChildren;
}

export type RuleFnCallCstChildren = {
  glsl_vec2f?: IToken[];
  glsl_vec3f?: IToken[];
  glsl_vec4f?: IToken[];
  glsl_vec2?: IToken[];
  glsl_vec3?: IToken[];
  glsl_vec4?: IToken[];
  glsl_float?: IToken[];
  glsl_sampler2D?: IToken[];
  Identifier?: IToken[];
  LBracket: IToken[];
  RuleAssignableValue?: RuleAssignableValueCstNode[];
  Comma?: IToken[];
};

export interface RuleFnRelationExprCstNode extends CstNode {
  name: 'RuleFnRelationExpr';
  children: RuleFnRelationExprCstChildren;
}

export type RuleFnRelationExprCstChildren = {
  RuleFnAddExpr: RuleFnAddExprCstNode[];
  RuleRelationOperator: RuleRelationOperatorCstNode[];
};

export interface RuleFnVariableDeclarationCstNode extends CstNode {
  name: 'RuleFnVariableDeclaration';
  children: RuleFnVariableDeclarationCstChildren;
}

export type RuleFnVariableDeclarationCstChildren = {
  RuleVariableType: RuleVariableTypeCstNode[];
  Identifier: IToken[];
  Equal?: IToken[];
  RuleFnExpression?: RuleFnExpressionCstNode[];
};

export interface RuleFnStatementCstNode extends CstNode {
  name: 'RuleFnStatement';
  children: RuleFnStatementCstChildren;
}

export type RuleFnStatementCstChildren = {
  RuleFnCall?: RuleFnCallCstNode[];
  RuleFnVariableDeclaration?: RuleFnVariableDeclarationCstNode[];
  RuleFnConditionStatement?: RuleFnConditionStatementCstNode[];
  RuleFnAssignStatement?: RuleFnAssignStatementCstNode[];
};

export interface RuleFnAssignStatementCstNode extends CstNode {
  name: 'RuleFnAssignStatement';
  children: RuleFnAssignStatementCstChildren;
}

export type RuleFnAssignStatementCstChildren = {
  gl_Position?: IToken[];
  gl_FragColor?: IToken[];
  Identifier?: IToken[];
  Equal: IToken[];
  RuleFnExpression: RuleFnExpressionCstNode[];
};

export interface RuleFnBlockStatementCstNode extends CstNode {
  name: 'RuleFnBlockStatement';
  children: RuleFnBlockStatementCstChildren;
}

export type RuleFnBlockStatementCstChildren = {
  LCurly: IToken[];
  RuleFnBody: RuleFnBodyCstNode[];
  RCurly: IToken[];
};

export interface RuleFnConditionStatementCstNode extends CstNode {
  name: 'RuleFnConditionStatement';
  children: RuleFnConditionStatementCstChildren;
}

export type RuleFnConditionStatementCstChildren = {
  if: IToken[];
  LBracket: IToken[];
  RuleFnRelationExpr: RuleFnRelationExprCstNode[];
  else?: IToken[];
  RuleFnBlockStatement?: RuleFnBlockStatementCstNode[];
};

export interface RuleFnCstNode extends CstNode {
  name: 'RuleFn';
  children: RuleFnCstChildren;
}

export type RuleFnCstChildren = {
  RuleVariableType?: RuleVariableTypeCstNode[];
  void?: IToken[];
  Identifier: IToken[];
  LBracket: IToken[];
  Comma?: IToken[];
  LCurly: IToken[];
  RuleFnBody: RuleFnBodyCstNode[];
  RCurly: IToken[];
};

export interface RuleFnBodyCstNode extends CstNode {
  name: 'RuleFnBody';
  children: RuleFnBodyCstChildren;
}

export type RuleFnBodyCstChildren = {
  RuleFnStatement?: RuleFnStatementCstNode[];
  Semicolon?: IToken[];
};

export interface RuleVariableTypeCstNode extends CstNode {
  name: 'RuleVariableType';
  children: RuleVariableTypeCstChildren;
}

export type RuleVariableTypeCstChildren = {
  glsl_vec2f?: IToken[];
  glsl_vec3f?: IToken[];
  glsl_vec4f?: IToken[];
  glsl_vec2?: IToken[];
  glsl_vec3?: IToken[];
  glsl_vec4?: IToken[];
  glsl_float?: IToken[];
  glsl_sampler2D?: IToken[];
  Identifier?: IToken[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  RuleShader(children: RuleShaderCstChildren, param?: IN): OUT;
  RuleSubShader(children: RuleSubShaderCstChildren, param?: IN): OUT;
  RuleShaderPass(children: RuleShaderPassCstChildren, param?: IN): OUT;
  RuleProteryItem(children: RuleProteryItemCstChildren, param?: IN): OUT;
  RulePropertyItemType(
    children: RulePropertyItemTypeCstChildren,
    param?: IN
  ): OUT;
  RulePropertyItemValue(
    children: RulePropertyItemValueCstChildren,
    param?: IN
  ): OUT;
  RuleRange(children: RuleRangeCstChildren, param?: IN): OUT;
  RuleProperty(children: RulePropertyCstChildren, param?: IN): OUT;
  TupleInt2(children: TupleInt2CstChildren, param?: IN): OUT;
  TupleInt3(children: TupleInt3CstChildren, param?: IN): OUT;
  TupleInt4(children: TupleInt4CstChildren, param?: IN): OUT;
  TupleFloat2(children: TupleFloat2CstChildren, param?: IN): OUT;
  TupleFloat3(children: TupleFloat3CstChildren, param?: IN): OUT;
  TupleFloat4(children: TupleFloat4CstChildren, param?: IN): OUT;
  RuleTag(children: RuleTagCstChildren, param?: IN): OUT;
  SubShaderPassPropertyAssignment(
    children: SubShaderPassPropertyAssignmentCstChildren,
    param?: IN
  ): OUT;
  RuleStruct(children: RuleStructCstChildren, param?: IN): OUT;
  RuleDeclarationType(
    children: RuleDeclarationTypeCstChildren,
    param?: IN
  ): OUT;
  RuleRenderStateType(
    children: RuleRenderStateTypeCstChildren,
    param?: IN
  ): OUT;
  RuleStateProperty(children: RuleStatePropertyCstChildren, param?: IN): OUT;
  RuleAssignableValue(
    children: RuleAssignableValueCstChildren,
    param?: IN
  ): OUT;
  RuleRenderStateDeclaration(
    children: RuleRenderStateDeclarationCstChildren,
    param?: IN
  ): OUT;
  RuleStatePropertyAssign(
    children: RuleStatePropertyAssignCstChildren,
    param?: IN
  ): OUT;
  RuleNumber(children: RuleNumberCstChildren, param?: IN): OUT;
  RuleAddOperator(children: RuleAddOperatorCstChildren, param?: IN): OUT;
  RuleMultiplcationOperator(
    children: RuleMultiplcationOperatorCstChildren,
    param?: IN
  ): OUT;
  RuleRelationOperator(
    children: RuleRelationOperatorCstChildren,
    param?: IN
  ): OUT;
  RuleFnExpression(children: RuleFnExpressionCstChildren, param?: IN): OUT;
  RuleFnAddExpr(children: RuleFnAddExprCstChildren, param?: IN): OUT;
  RuleFnMultiplicationExpr(
    children: RuleFnMultiplicationExprCstChildren,
    param?: IN
  ): OUT;
  RuleFnAtomicExpr(children: RuleFnAtomicExprCstChildren, param?: IN): OUT;
  RuleFnParenthesisExpr(
    children: RuleFnParenthesisExprCstChildren,
    param?: IN
  ): OUT;
  RuleFnPowExpr(children: RuleFnPowExprCstChildren, param?: IN): OUT;
  RuleFnCall(children: RuleFnCallCstChildren, param?: IN): OUT;
  RuleFnRelationExpr(children: RuleFnRelationExprCstChildren, param?: IN): OUT;
  RuleFnVariableDeclaration(
    children: RuleFnVariableDeclarationCstChildren,
    param?: IN
  ): OUT;
  RuleFnStatement(children: RuleFnStatementCstChildren, param?: IN): OUT;
  RuleFnAssignStatement(
    children: RuleFnAssignStatementCstChildren,
    param?: IN
  ): OUT;
  RuleFnBlockStatement(
    children: RuleFnBlockStatementCstChildren,
    param?: IN
  ): OUT;
  RuleFnConditionStatement(
    children: RuleFnConditionStatementCstChildren,
    param?: IN
  ): OUT;
  RuleFn(children: RuleFnCstChildren, param?: IN): OUT;
  RuleFnBody(children: RuleFnBodyCstChildren, param?: IN): OUT;
  RuleVariableType(children: RuleVariableTypeCstChildren, param?: IN): OUT;
}
