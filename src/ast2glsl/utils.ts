export function extractObj(
  info: any,
  opts: { kn?: string; vn?: string; fv?: (info: any) => any } = {}
): Record<string, any> {
  const ret = {} as IShaderTag;
  const { kn = 'name', vn = 'value', fv } = opts;
  info.forEach((item: any) => {
    ret[item[kn]] = fv?.(item) ?? item[vn];
  });
  return ret;
}
