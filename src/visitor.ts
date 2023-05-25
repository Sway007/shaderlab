import {
  ICstNodeVisitor,
  RuleDeclarationCstChildren,
  RuleFnAddExprCstChildren,
  RuleFnArgCstChildren,
  RuleFnAssignLOCstChildren,
  RuleFnAssignStatementCstChildren,
  RuleFnAtomicExprCstChildren,
  RuleFnBlockStatementCstChildren,
  RuleFnBodyCstChildren,
  RuleFnCallCstChildren,
  RuleFnConditionStatementCstChildren,
  RuleFnCstChildren,
  RuleFnExpressionCstChildren,
  RuleFnMacroConditionBranchCstChildren,
  RuleFnMacroConditionCstChildren,
  RuleFnMacroCstChildren,
  RuleFnMacroIncludeCstChildren,
  RuleFnMultiplicationExprCstChildren,
  RuleFnParenthesisExprCstChildren,
  RuleFnRelationExprCstChildren,
  RuleFnReturnStatementCstChildren,
  RuleFnStatementCstChildren,
  RuleFnVariableCstChildren,
  RuleFnVariableDeclarationCstChildren,
  RuleNumberCstChildren,
  RulePropertyCstChildren,
  RulePropertyItemValueCstChildren,
  RuleProteryItemCstChildren,
  RuleRangeCstChildren,
  RuleRenderStateDeclarationCstChildren,
  RuleShaderCstChildren,
  RuleShaderPassCstChildren,
  RuleStatePropertyAssignCstChildren,
  RuleStructCstChildren,
  RuleSubShaderCstChildren,
  RuleTagAssignmentCstChildren,
  RuleTagCstChildren,
  SubShaderPassPropertyAssignmentCstChildren,
  TupleFloat4CstChildren,
  TupleInt4CstChildren,
} from './types';
import ShaderParser from './parser';
import { defaultVisit, extractCstToken } from './utils';

const parser = new ShaderParser();
const ShaderVisitorConstructor =
  parser.getBaseCstVisitorConstructorWithDefaults();

export default class ShaderVisitor
  extends ShaderVisitorConstructor
  implements Partial<ICstNodeVisitor<any, any>>
{
  constructor() {
    super();
    this.validateVisitor();
  }

  RuleShader(ctx: RuleShaderCstChildren) {
    const editorProperties = ctx.RuleProperty
      ? this.visit(ctx.RuleProperty)
      : undefined;

    const subShader = ctx.RuleSubShader?.map((item) => this.visit(item));

    return {
      name: ctx.ValueString[0].image,
      editorProperties,
      subShader,
    };
  }

  RuleSubShader(ctx: RuleSubShaderCstChildren) {
    const tags = ctx.RuleTag ? this.visit(ctx.RuleTag) : undefined;

    const pass = ctx.RuleShaderPass?.map((item) => this.visit(item));

    return {
      name: ctx.ValueString[0].image,
      tags,
      pass,
    };
  }

  RuleShaderPass(ctx: RuleShaderPassCstChildren) {
    const tags = ctx.RuleTag ? this.visit(ctx.RuleTag) : undefined;
    const propterties = ctx.SubShaderPassPropertyAssignment?.map((item) =>
      this.visit(item)
    );
    const structs = ctx.RuleStruct?.map((item) => this.visit(item));
    const variables = ctx.RuleFnVariableDeclaration?.map((item) =>
      this.visit(item)
    );
    const renderStates = ctx.RuleRenderStateDeclaration?.map((item) =>
      this.visit(item)
    );
    const functions = ctx.RuleFn?.map((item) => this.visit(item));

    return {
      name: ctx.ValueString[0].image,
      tags,
      propterties,
      structs,
      variables,
      renderStates,
      functions,
    };
  }

  RuleFn(ctx: RuleFnCstChildren) {
    const args = ctx.RuleFnArg?.map((item) => this.visit(item));
    const body = this.visit(ctx.RuleFnBody);

    return {
      returnType: extractCstToken(ctx.RuleFnReturnType[0]),
      name: ctx.Identifier[0].image,
      args,
      body,
    };
  }

  RuleFnBody(ctx: RuleFnBodyCstChildren) {
    return {
      statements: ctx.RuleFnStatement?.map((item) => this.visit(item)),
      marcos: ctx.RuleFnMacro?.map((item) => this.visit(item)),
    };
  }

  RuleFnMacro(children: RuleFnMacroCstChildren, param?: any) {
    return defaultVisit.bind(this)(children);
  }

  RuleFnMacroInclude(children: RuleFnMacroIncludeCstChildren, param?: any) {
    return {
      line: children.m_include[0].startLine,
      name: children.ValueString[0].image,
    };
  }

  RuleFnMacroCondition(children: RuleFnMacroConditionCstChildren, param?: any) {
    children.RuleFnBody;
    return {
      line: children.Identifier[0].startLine,
      command: extractCstToken(children.RuleFnMacroConditionDeclare[0]),
      identifier: children.Identifier[0].image,
      body: this.visit(children.RuleFnBody),
      branch:
        children.RuleFnMacroConditionBranch &&
        this.visit(children.RuleFnMacroConditionBranch),
    };
  }

  RuleFnMacroConditionBranch(
    children: RuleFnMacroConditionBranchCstChildren,
    param?: any
  ) {
    return {
      declare: extractCstToken(children.RuleFnMacroConditionBranchDeclare[0]),
    };
  }

  RuleFnStatement(ctx: RuleFnStatementCstChildren) {
    return defaultVisit.bind(this)(ctx);
  }

  RuleFnCall(ctx: RuleFnCallCstChildren) {
    const args = ctx.RuleAssignableValue?.map((item) =>
      extractCstToken(item, {
        fnNode: (node) => {
          if (node.name === 'RuleFnCall') return this.visit(node);
        },
      })
    );

    return {
      line: ctx.LBracket[0].startLine,
      function: extractCstToken(ctx),
      args,
    };
  }

  RuleFnConditionStatement(ctx: RuleFnConditionStatementCstChildren) {
    return {
      line: ctx.if[0].startLine,
      relation: this.visit(ctx.RuleFnRelationExpr),
      body: this.visit(ctx.RuleFnBlockStatement),
    };
  }

  RuleFnRelationExpr(ctx: RuleFnRelationExprCstChildren) {
    const operands = ctx.RuleFnAddExpr.map((item) => this.visit(item));

    return {
      operator: extractCstToken(ctx.RuleRelationOperator[0]),
      operands,
    };
  }

  RuleFnBlockStatement(ctx: RuleFnBlockStatementCstChildren) {
    return this.visit(ctx.RuleFnBody);
  }

  RuleFnAssignStatement(ctx: RuleFnAssignStatementCstChildren) {
    const lo = this.visit(ctx.RuleFnAssignLO);

    return {
      line: lo.line,
      asignee: this.visit(ctx.RuleFnAssignLO),
      value: this.visit(ctx.RuleFnExpression),
    };
  }

  RuleFnExpression(ctx: RuleFnExpressionCstChildren) {
    return this.visit(ctx.RuleFnAddExpr);
  }

  RuleFnAddExpr(ctx: RuleFnAddExprCstChildren) {
    if (ctx.RuleAddOperator) {
      const operands = ctx.RuleFnMultiplicationExpr?.map((item) =>
        this.visit(item)
      );

      return {
        operator: extractCstToken(ctx.RuleAddOperator?.[0]),
        operands,
      };
    }
    return this.visit(ctx.RuleFnMultiplicationExpr);
  }

  RuleFnMultiplicationExpr(ctx: RuleFnMultiplicationExprCstChildren) {
    if (ctx.RuleMultiplcationOperator) {
      const operands = ctx.RuleFnAtomicExpr?.map((item) => {
        this.visit(item);
      });

      return {
        operator: extractCstToken(ctx.RuleMultiplcationOperator[0]),
        operands,
      };
    }
    return this.visit(ctx.RuleFnAtomicExpr);
  }

  RuleFnAtomicExpr(ctx: RuleFnAtomicExprCstChildren) {
    return defaultVisit.bind(this)(ctx);
  }

  RuleFnParenthesisExpr(ctx: RuleFnParenthesisExprCstChildren) {
    return this.visit(ctx.RuleFnAddExpr);
  }

  RuleNumber(ctx: RuleNumberCstChildren) {
    return extractCstToken(ctx, { fnToken: (token) => Number(token.image) });
  }

  RuleFnAssignLO(ctx: RuleFnAssignLOCstChildren) {
    if (ctx.RuleFnVariable) {
      return this.visit(ctx.RuleFnVariable);
    }

    const token = ctx.gl_FragColor ?? ctx.gl_Position;
    return {
      asignee: token?.[0].image,
      line: token?.[0].startLine,
    };
  }

  RuleFnVariable(ctx: RuleFnVariableCstChildren) {
    return {
      text: ctx.Identifier.map((item) => item.image),
      line: ctx.Identifier[0].startLine,
    };
  }

  RuleFnReturnStatement(ctx: RuleFnReturnStatementCstChildren) {
    return {
      line: ctx.return[0].startLine,
      value: extractCstToken(ctx.RuleFnReturnVariable[0]),
    };
  }

  RuleFnArg(ctx: RuleFnArgCstChildren) {
    return {
      name: ctx.Identifier[0].image,
      type: extractCstToken(ctx.RuleVariableType[0]),
    };
  }

  RuleRenderStateDeclaration(ctx: RuleRenderStateDeclarationCstChildren) {
    const properties = ctx.RuleStatePropertyAssign?.map((item) =>
      this.visit(item)
    );

    return {
      name: ctx.Identifier[0].image,
      type: extractCstToken(ctx.RuleRenderStateType[0]),
      properties,
    };
  }

  RuleStatePropertyAssign(ctx: RuleStatePropertyAssignCstChildren) {
    return {
      name: extractCstToken(ctx.RuleStateProperty[0]),
      value: extractCstToken(ctx.RuleAssignableValue[0]),
    };
  }

  RuleFnVariableDeclaration(ctx: RuleFnVariableDeclarationCstChildren) {
    return {
      line: ctx.Identifier[0].startLine,
      type: extractCstToken(ctx.RuleVariableType[0]),
      variable: ctx.Identifier[0].image,
      default: ctx.RuleFnExpression
        ? this.visit(ctx.RuleFnExpression)
        : undefined,
    };
  }

  RuleStruct(ctx: RuleStructCstChildren) {
    const variables = ctx.RuleDeclaration?.map((item) => this.visit(item));

    return {
      name: ctx.Identifier[0].image,
      variables,
    };
  }

  RuleDeclaration(ctx: RuleDeclarationCstChildren) {
    return {
      type: extractCstToken(ctx.RuleVariableType[0]),
      variable: ctx.Identifier[0].image,
    };
  }

  SubShaderPassPropertyAssignment(
    ctx: SubShaderPassPropertyAssignmentCstChildren
  ) {
    return {
      type: extractCstToken(ctx.RuleShaderPassPropertyType[0]),
      value: ctx.Identifier[0].image,
    };
  }

  RuleTag(ctx: RuleTagCstChildren) {
    return ctx.RuleTagAssignment?.map((item) => this.visit(item));
  }

  RuleTagAssignment(ctx: RuleTagAssignmentCstChildren) {
    return {
      tag: extractCstToken(ctx.RuleTagType[0]),
      value: ctx.ValueString[0].image,
    };
  }

  RuleProperty(ctx: RulePropertyCstChildren) {
    return ctx.RuleProteryItem?.map((item) => this.visit(item));
  }

  RuleProteryItem(ctx: RuleProteryItemCstChildren) {
    return {
      propertyName: ctx.Identifier[0].image,
      desc: ctx.ValueString[0].image,
      type: extractCstToken(ctx.RulePropertyItemType[0]),
      default: this.visit(ctx.RulePropertyItemValue),
    };
  }

  RulePropertyItemValue(ctx: RulePropertyItemValueCstChildren) {
    return defaultVisit.bind(this)(ctx);
  }

  TupleFloat4(ctx: TupleFloat4CstChildren) {
    return ctx.ValueFloat.map((n) => Number(n));
  }

  TupleInt4(ctx: TupleInt4CstChildren) {
    return ctx.ValueInt.map((n) => Number(n.image));
  }

  RuleRange(ctx: RuleRangeCstChildren) {
    return ctx.ValueInt.map((int) => Number(int.image));
  }
}
