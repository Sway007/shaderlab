import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface RuleShaderCstNode extends CstNode {
  name: "RuleShader";
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

export interface RuleFnExpressionCstNode extends CstNode {
  name: "RuleFnExpression";
  children: RuleFnExpressionCstChildren;
}

export type RuleFnExpressionCstChildren = {
  RuleFnAddExpr: RuleFnAddExprCstNode[];
};

export interface RuleFnAddExprCstNode extends CstNode {
  name: "RuleFnAddExpr";
  children: RuleFnAddExprCstChildren;
}

export type RuleFnAddExprCstChildren = {
  RuleFnMultiplicationExpr: (RuleFnMultiplicationExprCstNode)[];
  RuleAddOperator?: RuleAddOperatorCstNode[];
};

export interface RuleFnMultiplicationExprCstNode extends CstNode {
  name: "RuleFnMultiplicationExpr";
  children: RuleFnMultiplicationExprCstChildren;
}

export type RuleFnMultiplicationExprCstChildren = {
  RuleFnAtomicExpr: (RuleFnAtomicExprCstNode)[];
  RuleMultiplcationOperator?: RuleMultiplcationOperatorCstNode[];
};

export interface RuleFnAtomicExprCstNode extends CstNode {
  name: "RuleFnAtomicExpr";
  children: RuleFnAtomicExprCstChildren;
}

export type RuleFnAtomicExprCstChildren = {
  RuleFnParenthesisExpr?: RuleFnParenthesisExprCstNode[];
  RuleNumber?: RuleNumberCstNode[];
  RuleFnPowExpr?: RuleFnPowExprCstNode[];
  RuleFnCall?: RuleFnCallCstNode[];
  RuleFnVariable?: RuleFnVariableCstNode[];
};

export interface RuleFnParenthesisExprCstNode extends CstNode {
  name: "RuleFnParenthesisExpr";
  children: RuleFnParenthesisExprCstChildren;
}

export type RuleFnParenthesisExprCstChildren = {
  LBracket: (IToken)[];
  RuleFnAddExpr: RuleFnAddExprCstNode[];
};

export interface RuleFnPowExprCstNode extends CstNode {
  name: "RuleFnPowExpr";
  children: RuleFnPowExprCstChildren;
}

export type RuleFnPowExprCstChildren = {
  pow: IToken[];
  LBracket: (IToken)[];
  RuleFnAddExpr: (RuleFnAddExprCstNode)[];
  Comma: IToken[];
};

export interface RuleFnCallCstNode extends CstNode {
  name: "RuleFnCall";
  children: RuleFnCallCstChildren;
}

export type RuleFnCallCstChildren = {
  RuleFnCallVariable: RuleFnCallVariableCstNode[];
  LBracket: (IToken)[];
  RuleAssignableValue?: RuleAssignableValueCstNode[];
  Comma?: IToken[];
};

export interface RuleFnCallVariableCstNode extends CstNode {
  name: "RuleFnCallVariable";
  children: RuleFnCallVariableCstChildren;
}

export type RuleFnCallVariableCstChildren = {
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

export interface RuleFnRelationExprCstNode extends CstNode {
  name: "RuleFnRelationExpr";
  children: RuleFnRelationExprCstChildren;
}

export type RuleFnRelationExprCstChildren = {
  RuleFnAddExpr: (RuleFnAddExprCstNode)[];
  RuleRelationOperator: RuleRelationOperatorCstNode[];
};

export interface RuleFnVariableDeclarationCstNode extends CstNode {
  name: "RuleFnVariableDeclaration";
  children: RuleFnVariableDeclarationCstChildren;
}

export type RuleFnVariableDeclarationCstChildren = {
  RuleVariableType: RuleVariableTypeCstNode[];
  Identifier: IToken[];
  Equal?: IToken[];
  RuleFnExpression?: RuleFnExpressionCstNode[];
};

export interface RuleFnStatementCstNode extends CstNode {
  name: "RuleFnStatement";
  children: RuleFnStatementCstChildren;
}

export type RuleFnStatementCstChildren = {
  RuleFnCall?: RuleFnCallCstNode[];
  RuleFnReturnStatement?: RuleFnReturnStatementCstNode[];
  RuleFnVariableDeclaration?: RuleFnVariableDeclarationCstNode[];
  RuleFnConditionStatement?: RuleFnConditionStatementCstNode[];
  RuleFnAssignStatement?: RuleFnAssignStatementCstNode[];
  discard?: IToken[];
};

export interface RuleFnAssignStatementCstNode extends CstNode {
  name: "RuleFnAssignStatement";
  children: RuleFnAssignStatementCstChildren;
}

export type RuleFnAssignStatementCstChildren = {
  RuleFnAssignLO: RuleFnAssignLOCstNode[];
  RuleFnAssignmentOperator: RuleFnAssignmentOperatorCstNode[];
  RuleFnExpression: RuleFnExpressionCstNode[];
};

export interface RuleFnAssignmentOperatorCstNode extends CstNode {
  name: "RuleFnAssignmentOperator";
  children: RuleFnAssignmentOperatorCstChildren;
}

export type RuleFnAssignmentOperatorCstChildren = {
  Equal?: IToken[];
  MultiEqual?: IToken[];
  DivideEqual?: IToken[];
};

export interface RuleFnAssignLOCstNode extends CstNode {
  name: "RuleFnAssignLO";
  children: RuleFnAssignLOCstChildren;
}

export type RuleFnAssignLOCstChildren = {
  gl_Position?: IToken[];
  gl_FragColor?: IToken[];
  RuleFnVariable?: RuleFnVariableCstNode[];
};

export interface RuleFnVariableCstNode extends CstNode {
  name: "RuleFnVariable";
  children: RuleFnVariableCstChildren;
}

export type RuleFnVariableCstChildren = {
  Identifier: (IToken)[];
  Dot?: IToken[];
};

export interface RuleFnBlockStatementCstNode extends CstNode {
  name: "RuleFnBlockStatement";
  children: RuleFnBlockStatementCstChildren;
}

export type RuleFnBlockStatementCstChildren = {
  LCurly: IToken[];
  RuleFnBody: RuleFnBodyCstNode[];
  RCurly: IToken[];
};

export interface RuleFnConditionStatementCstNode extends CstNode {
  name: "RuleFnConditionStatement";
  children: RuleFnConditionStatementCstChildren;
}

export type RuleFnConditionStatementCstChildren = {
  if: (IToken)[];
  LBracket: (IToken)[];
  RuleFnRelationExpr: RuleFnRelationExprCstNode[];
  else?: (IToken)[];
  RuleFnBlockStatement: (RuleFnBlockStatementCstNode)[];
};

export interface RuleFnReturnStatementCstNode extends CstNode {
  name: "RuleFnReturnStatement";
  children: RuleFnReturnStatementCstChildren;
}

export type RuleFnReturnStatementCstChildren = {
  return: IToken[];
  RuleFnReturnVariable: RuleFnReturnVariableCstNode[];
};

export interface RuleFnReturnVariableCstNode extends CstNode {
  name: "RuleFnReturnVariable";
  children: RuleFnReturnVariableCstChildren;
}

export type RuleFnReturnVariableCstChildren = {
  ValueFloat?: IToken[];
  ValueInt?: IToken[];
  ValueString?: IToken[];
  ValueTrue?: IToken[];
  ValueFalse?: IToken[];
  RuleFnVariable?: RuleFnVariableCstNode[];
};

export interface RuleFnMacroCstNode extends CstNode {
  name: "RuleFnMacro";
  children: RuleFnMacroCstChildren;
}

export type RuleFnMacroCstChildren = {
  RuleFnMacroDefine?: RuleFnMacroDefineCstNode[];
  RuleFnMacroInclude?: RuleFnMacroIncludeCstNode[];
  RuleFnMacroCondition?: RuleFnMacroConditionCstNode[];
};

export interface RuleFnMacroConditionCstNode extends CstNode {
  name: "RuleFnMacroCondition";
  children: RuleFnMacroConditionCstChildren;
}

export type RuleFnMacroConditionCstChildren = {
  RuleFnMacroConditionDeclare: RuleFnMacroConditionDeclareCstNode[];
  Identifier: IToken[];
  RuleFnBody: (RuleFnBodyCstNode)[];
  RuleFnMacroConditionBranch?: RuleFnMacroConditionBranchCstNode[];
  m_endif: IToken[];
};

export interface RuleFnMacroConditionBranchCstNode extends CstNode {
  name: "RuleFnMacroConditionBranch";
  children: RuleFnMacroConditionBranchCstChildren;
}

export type RuleFnMacroConditionBranchCstChildren = {
  RuleFnMacroConditionBranchDeclare: RuleFnMacroConditionBranchDeclareCstNode[];
  RuleFnBody: RuleFnBodyCstNode[];
};

export interface RuleFnMacroConditionBranchDeclareCstNode extends CstNode {
  name: "RuleFnMacroConditionBranchDeclare";
  children: RuleFnMacroConditionBranchDeclareCstChildren;
}

export type RuleFnMacroConditionBranchDeclareCstChildren = {
  m_else?: IToken[];
};

export interface RuleFnMacroConditionDeclareCstNode extends CstNode {
  name: "RuleFnMacroConditionDeclare";
  children: RuleFnMacroConditionDeclareCstChildren;
}

export type RuleFnMacroConditionDeclareCstChildren = {
  m_ifdef?: IToken[];
  m_ifndef?: IToken[];
};

export interface RuleFnMacroDefineCstNode extends CstNode {
  name: "RuleFnMacroDefine";
  children: RuleFnMacroDefineCstChildren;
}

export type RuleFnMacroDefineCstChildren = {
  m_define: IToken[];
  Identifier: IToken[];
};

export interface RuleFnMacroIncludeCstNode extends CstNode {
  name: "RuleFnMacroInclude";
  children: RuleFnMacroIncludeCstChildren;
}

export type RuleFnMacroIncludeCstChildren = {
  m_include: IToken[];
  ValueString: IToken[];
};

export interface RuleFnCstNode extends CstNode {
  name: "RuleFn";
  children: RuleFnCstChildren;
}

export type RuleFnCstChildren = {
  RuleFnReturnType: RuleFnReturnTypeCstNode[];
  Identifier: IToken[];
  LBracket: (IToken)[];
  RuleFnArg?: RuleFnArgCstNode[];
  Comma?: IToken[];
  LCurly: IToken[];
  RuleFnBody: RuleFnBodyCstNode[];
  RCurly: IToken[];
};

export interface RuleFnArgCstNode extends CstNode {
  name: "RuleFnArg";
  children: RuleFnArgCstChildren;
}

export type RuleFnArgCstChildren = {
  RuleVariableType: RuleVariableTypeCstNode[];
  Identifier: IToken[];
};

export interface RuleFnReturnTypeCstNode extends CstNode {
  name: "RuleFnReturnType";
  children: RuleFnReturnTypeCstChildren;
}

export type RuleFnReturnTypeCstChildren = {
  RuleVariableType?: RuleVariableTypeCstNode[];
  void?: IToken[];
};

export interface RuleFnBodyCstNode extends CstNode {
  name: "RuleFnBody";
  children: RuleFnBodyCstChildren;
}

export type RuleFnBodyCstChildren = {
  RuleFnMacro?: RuleFnMacroCstNode[];
  RuleFnStatement?: RuleFnStatementCstNode[];
  Semicolon?: IToken[];
};

export interface RuleSubShaderCstNode extends CstNode {
  name: "RuleSubShader";
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
  name: "RuleShaderPass";
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
  name: "RuleProteryItem";
  children: RuleProteryItemCstChildren;
}

export type RuleProteryItemCstChildren = {
  Identifier: IToken[];
  LBracket: (IToken)[];
  ValueString: IToken[];
  Comma: IToken[];
  RulePropertyItemType: RulePropertyItemTypeCstNode[];
  Equal: IToken[];
  RulePropertyItemValue: RulePropertyItemValueCstNode[];
  Semicolon: IToken[];
};

export interface RulePropertyItemTypeCstNode extends CstNode {
  name: "RulePropertyItemType";
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
  name: "RulePropertyItemValue";
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
  name: "RuleRange";
  children: RuleRangeCstChildren;
}

export type RuleRangeCstChildren = {
  Range: IToken[];
  LBracket: (IToken)[];
  ValueInt: (IToken)[];
  Comma: IToken[];
};

export interface RulePropertyCstNode extends CstNode {
  name: "RuleProperty";
  children: RulePropertyCstChildren;
}

export type RulePropertyCstChildren = {
  EditorProperties: IToken[];
  LCurly: IToken[];
  RuleProteryItem?: RuleProteryItemCstNode[];
  RCurly: IToken[];
};

export interface TupleInt2CstNode extends CstNode {
  name: "TupleInt2";
  children: TupleInt2CstChildren;
}

export type TupleInt2CstChildren = {
  LBracket: (IToken)[];
  ValueInt: (IToken)[];
  Comma: IToken[];
};

export interface TupleInt3CstNode extends CstNode {
  name: "TupleInt3";
  children: TupleInt3CstChildren;
}

export type TupleInt3CstChildren = {
  LBracket: (IToken)[];
  ValueInt: (IToken)[];
  Comma: (IToken)[];
};

export interface TupleInt4CstNode extends CstNode {
  name: "TupleInt4";
  children: TupleInt4CstChildren;
}

export type TupleInt4CstChildren = {
  LBracket: (IToken)[];
  ValueInt: (IToken)[];
  Comma: (IToken)[];
};

export interface TupleFloat2CstNode extends CstNode {
  name: "TupleFloat2";
  children: TupleFloat2CstChildren;
}

export type TupleFloat2CstChildren = {
  LBracket: (IToken)[];
  ValueFloat: (IToken)[];
  Comma: IToken[];
};

export interface TupleFloat3CstNode extends CstNode {
  name: "TupleFloat3";
  children: TupleFloat3CstChildren;
}

export type TupleFloat3CstChildren = {
  LBracket: (IToken)[];
  ValueFloat: (IToken)[];
  Comma: (IToken)[];
};

export interface TupleFloat4CstNode extends CstNode {
  name: "TupleFloat4";
  children: TupleFloat4CstChildren;
}

export type TupleFloat4CstChildren = {
  LBracket: (IToken)[];
  ValueFloat: (IToken)[];
  Comma: (IToken)[];
};

export interface RuleTagCstNode extends CstNode {
  name: "RuleTag";
  children: RuleTagCstChildren;
}

export type RuleTagCstChildren = {
  Tags: IToken[];
  LCurly: IToken[];
  RuleTagAssignment?: RuleTagAssignmentCstNode[];
  Comma?: IToken[];
  RCurly: IToken[];
};

export interface RuleTagAssignmentCstNode extends CstNode {
  name: "RuleTagAssignment";
  children: RuleTagAssignmentCstChildren;
}

export type RuleTagAssignmentCstChildren = {
  RuleTagType: RuleTagTypeCstNode[];
  Equal: IToken[];
  ValueString: IToken[];
};

export interface RuleTagTypeCstNode extends CstNode {
  name: "RuleTagType";
  children: RuleTagTypeCstChildren;
}

export type RuleTagTypeCstChildren = {
  ReplacementTag?: IToken[];
  PipelineStage?: IToken[];
};

export interface SubShaderPassPropertyAssignmentCstNode extends CstNode {
  name: "SubShaderPassPropertyAssignment";
  children: SubShaderPassPropertyAssignmentCstChildren;
}

export type SubShaderPassPropertyAssignmentCstChildren = {
  RuleShaderPassPropertyType: RuleShaderPassPropertyTypeCstNode[];
  Equal: IToken[];
  Identifier: IToken[];
};

export interface RuleShaderPassPropertyTypeCstNode extends CstNode {
  name: "RuleShaderPassPropertyType";
  children: RuleShaderPassPropertyTypeCstChildren;
}

export type RuleShaderPassPropertyTypeCstChildren = {
  RuleRenderStateType?: RuleRenderStateTypeCstNode[];
  VertexShader?: IToken[];
  FragmentShader?: IToken[];
};

export interface RuleStructCstNode extends CstNode {
  name: "RuleStruct";
  children: RuleStructCstChildren;
}

export type RuleStructCstChildren = {
  struct: IToken[];
  Identifier: IToken[];
  LCurly: IToken[];
  RuleDeclaration?: RuleDeclarationCstNode[];
  Semicolon?: IToken[];
  RCurly: IToken[];
};

export interface RuleDeclarationCstNode extends CstNode {
  name: "RuleDeclaration";
  children: RuleDeclarationCstChildren;
}

export type RuleDeclarationCstChildren = {
  RuleVariableType: RuleVariableTypeCstNode[];
  Identifier: IToken[];
};

export interface RuleRenderStateTypeCstNode extends CstNode {
  name: "RuleRenderStateType";
  children: RuleRenderStateTypeCstChildren;
}

export type RuleRenderStateTypeCstChildren = {
  BlendState?: IToken[];
  DepthState?: IToken[];
  RasterState?: IToken[];
  StencilState?: IToken[];
};

export interface RuleStatePropertyCstNode extends CstNode {
  name: "RuleStateProperty";
  children: RuleStatePropertyCstChildren;
}

export type RuleStatePropertyCstChildren = {
  Enabled?: IToken[];
  DestColorBlendFactor?: IToken[];
  SrcColorBlendFactor?: IToken[];
};

export interface RuleAssignableValueCstNode extends CstNode {
  name: "RuleAssignableValue";
  children: RuleAssignableValueCstChildren;
}

export type RuleAssignableValueCstChildren = {
  ValueTrue?: IToken[];
  ValueFalse?: IToken[];
  ValueInt?: IToken[];
  ValueString?: IToken[];
  ValueFloat?: IToken[];
  RuleFnCall?: RuleFnCallCstNode[];
  RuleFnVariable?: RuleFnVariableCstNode[];
};

export interface RuleRenderStateDeclarationCstNode extends CstNode {
  name: "RuleRenderStateDeclaration";
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
  name: "RuleStatePropertyAssign";
  children: RuleStatePropertyAssignCstChildren;
}

export type RuleStatePropertyAssignCstChildren = {
  RuleStateProperty: RuleStatePropertyCstNode[];
  Equal: IToken[];
  RuleAssignableValue: RuleAssignableValueCstNode[];
};

export interface RuleNumberCstNode extends CstNode {
  name: "RuleNumber";
  children: RuleNumberCstChildren;
}

export type RuleNumberCstChildren = {
  ValueInt?: IToken[];
  ValueFloat?: IToken[];
};

export interface RuleAddOperatorCstNode extends CstNode {
  name: "RuleAddOperator";
  children: RuleAddOperatorCstChildren;
}

export type RuleAddOperatorCstChildren = {
  Add?: IToken[];
  Minus?: IToken[];
};

export interface RuleMultiplcationOperatorCstNode extends CstNode {
  name: "RuleMultiplcationOperator";
  children: RuleMultiplcationOperatorCstChildren;
}

export type RuleMultiplcationOperatorCstChildren = {
  Multiply?: IToken[];
  Divide?: IToken[];
};

export interface RuleRelationOperatorCstNode extends CstNode {
  name: "RuleRelationOperator";
  children: RuleRelationOperatorCstChildren;
}

export type RuleRelationOperatorCstChildren = {
  GreaterThan?: IToken[];
  LessThan?: IToken[];
};

export interface RuleVariableTypeCstNode extends CstNode {
  name: "RuleVariableType";
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
  RuleFnExpression(children: RuleFnExpressionCstChildren, param?: IN): OUT;
  RuleFnAddExpr(children: RuleFnAddExprCstChildren, param?: IN): OUT;
  RuleFnMultiplicationExpr(children: RuleFnMultiplicationExprCstChildren, param?: IN): OUT;
  RuleFnAtomicExpr(children: RuleFnAtomicExprCstChildren, param?: IN): OUT;
  RuleFnParenthesisExpr(children: RuleFnParenthesisExprCstChildren, param?: IN): OUT;
  RuleFnPowExpr(children: RuleFnPowExprCstChildren, param?: IN): OUT;
  RuleFnCall(children: RuleFnCallCstChildren, param?: IN): OUT;
  RuleFnCallVariable(children: RuleFnCallVariableCstChildren, param?: IN): OUT;
  RuleFnRelationExpr(children: RuleFnRelationExprCstChildren, param?: IN): OUT;
  RuleFnVariableDeclaration(children: RuleFnVariableDeclarationCstChildren, param?: IN): OUT;
  RuleFnStatement(children: RuleFnStatementCstChildren, param?: IN): OUT;
  RuleFnAssignStatement(children: RuleFnAssignStatementCstChildren, param?: IN): OUT;
  RuleFnAssignmentOperator(children: RuleFnAssignmentOperatorCstChildren, param?: IN): OUT;
  RuleFnAssignLO(children: RuleFnAssignLOCstChildren, param?: IN): OUT;
  RuleFnVariable(children: RuleFnVariableCstChildren, param?: IN): OUT;
  RuleFnBlockStatement(children: RuleFnBlockStatementCstChildren, param?: IN): OUT;
  RuleFnConditionStatement(children: RuleFnConditionStatementCstChildren, param?: IN): OUT;
  RuleFnReturnStatement(children: RuleFnReturnStatementCstChildren, param?: IN): OUT;
  RuleFnReturnVariable(children: RuleFnReturnVariableCstChildren, param?: IN): OUT;
  RuleFnMacro(children: RuleFnMacroCstChildren, param?: IN): OUT;
  RuleFnMacroCondition(children: RuleFnMacroConditionCstChildren, param?: IN): OUT;
  RuleFnMacroConditionBranch(children: RuleFnMacroConditionBranchCstChildren, param?: IN): OUT;
  RuleFnMacroConditionBranchDeclare(children: RuleFnMacroConditionBranchDeclareCstChildren, param?: IN): OUT;
  RuleFnMacroConditionDeclare(children: RuleFnMacroConditionDeclareCstChildren, param?: IN): OUT;
  RuleFnMacroDefine(children: RuleFnMacroDefineCstChildren, param?: IN): OUT;
  RuleFnMacroInclude(children: RuleFnMacroIncludeCstChildren, param?: IN): OUT;
  RuleFn(children: RuleFnCstChildren, param?: IN): OUT;
  RuleFnArg(children: RuleFnArgCstChildren, param?: IN): OUT;
  RuleFnReturnType(children: RuleFnReturnTypeCstChildren, param?: IN): OUT;
  RuleFnBody(children: RuleFnBodyCstChildren, param?: IN): OUT;
  RuleSubShader(children: RuleSubShaderCstChildren, param?: IN): OUT;
  RuleShaderPass(children: RuleShaderPassCstChildren, param?: IN): OUT;
  RuleProteryItem(children: RuleProteryItemCstChildren, param?: IN): OUT;
  RulePropertyItemType(children: RulePropertyItemTypeCstChildren, param?: IN): OUT;
  RulePropertyItemValue(children: RulePropertyItemValueCstChildren, param?: IN): OUT;
  RuleRange(children: RuleRangeCstChildren, param?: IN): OUT;
  RuleProperty(children: RulePropertyCstChildren, param?: IN): OUT;
  TupleInt2(children: TupleInt2CstChildren, param?: IN): OUT;
  TupleInt3(children: TupleInt3CstChildren, param?: IN): OUT;
  TupleInt4(children: TupleInt4CstChildren, param?: IN): OUT;
  TupleFloat2(children: TupleFloat2CstChildren, param?: IN): OUT;
  TupleFloat3(children: TupleFloat3CstChildren, param?: IN): OUT;
  TupleFloat4(children: TupleFloat4CstChildren, param?: IN): OUT;
  RuleTag(children: RuleTagCstChildren, param?: IN): OUT;
  RuleTagAssignment(children: RuleTagAssignmentCstChildren, param?: IN): OUT;
  RuleTagType(children: RuleTagTypeCstChildren, param?: IN): OUT;
  SubShaderPassPropertyAssignment(children: SubShaderPassPropertyAssignmentCstChildren, param?: IN): OUT;
  RuleShaderPassPropertyType(children: RuleShaderPassPropertyTypeCstChildren, param?: IN): OUT;
  RuleStruct(children: RuleStructCstChildren, param?: IN): OUT;
  RuleDeclaration(children: RuleDeclarationCstChildren, param?: IN): OUT;
  RuleRenderStateType(children: RuleRenderStateTypeCstChildren, param?: IN): OUT;
  RuleStateProperty(children: RuleStatePropertyCstChildren, param?: IN): OUT;
  RuleAssignableValue(children: RuleAssignableValueCstChildren, param?: IN): OUT;
  RuleRenderStateDeclaration(children: RuleRenderStateDeclarationCstChildren, param?: IN): OUT;
  RuleStatePropertyAssign(children: RuleStatePropertyAssignCstChildren, param?: IN): OUT;
  RuleNumber(children: RuleNumberCstChildren, param?: IN): OUT;
  RuleAddOperator(children: RuleAddOperatorCstChildren, param?: IN): OUT;
  RuleMultiplcationOperator(children: RuleMultiplcationOperatorCstChildren, param?: IN): OUT;
  RuleRelationOperator(children: RuleRelationOperatorCstChildren, param?: IN): OUT;
  RuleVariableType(children: RuleVariableTypeCstChildren, param?: IN): OUT;
}
