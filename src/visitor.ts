import {
  RulePropertyCstChildren,
  RulePropertyItemTypeCstChildren,
  RulePropertyItemValueCstChildren,
  RuleProteryItemCstChildren,
  RuleRangeCstChildren,
  RuleShaderCstChildren,
  RuleSubShaderCstChildren,
  TupleFloat4CstChildren,
  TupleInt4CstChildren,
} from './cst';
import ShaderParser from './parser';
import { extractImage } from './utils';
import { IToken } from 'chevrotain';

const parser = new ShaderParser();
const ShaderVisitorConstructor =
  parser.getBaseCstVisitorConstructorWithDefaults();

export default class ShaderVisitor extends ShaderVisitorConstructor {
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
    return { name: ctx.ValueString[0].image };
  }

  RuleProperty(ctx: RulePropertyCstChildren) {
    return ctx.RuleProteryItem?.map((item) => this.visit(item));
  }

  RuleProteryItem(ctx: RuleProteryItemCstChildren) {
    return {
      propertyName: ctx.Identifier[0].image,
      desc: ctx.ValueString[0].image,
      type: extractImage(ctx.RulePropertyItemType[0]),
      default: this.visit(ctx.RulePropertyItemValue),
    };
  }

  RulePropertyItemValue(ctx: RulePropertyItemValueCstChildren) {
    const ret = {} as any;

    for (const k in ctx) {
      // @ts-ignore
      if (ctx[k][0].name) {
        // @ts-ignore
        ret[k] = this.visit(ctx[k]);
      } else {
        // @ts-ignore
        ret[k] = ctx[k][0].image;
      }
    }
    return ret;
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
