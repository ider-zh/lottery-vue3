// 阶乘
function Factorial(max: number, min: number): number {
  if (max >= min && max > 1) {
    return max * Factorial(max - 1, min);
  }
  return 1;
}

// 排列组合
export function Combine(m: number, n: number): number {
  if (m < n || n < 0) {
    return 0;
  }
  return Factorial(m, m - n + 1) / Factorial(n, 1);
}

// 渲染中奖情况
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RanderAwardSSQ(obj: any): string[] {
  const ret = [];
  if (obj.A > 0) {
    ret.push(`一等奖${obj.A}注`);
  }
  if (obj.B > 0) {
    ret.push(`二等奖${obj.B}注`);
  }
  if (obj.C > 0) {
    ret.push(`三等奖${obj.C}注`);
  }
  if (obj.D > 0) {
    ret.push(`四等奖${obj.D}注`);
  }
  if (obj.E > 0) {
    ret.push(`五等奖${obj.E}注`);
  }
  if (obj.F > 0) {
    ret.push(`六等奖${obj.F}注`);
  }
  return ret;
}

export function FormatNumber(val: number): string {
  if (String(val).length === 1) {
    return `0${val}`;
  }
  return String(val);
}

export default {};
