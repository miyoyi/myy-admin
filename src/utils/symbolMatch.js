export function symbolMatch (val) {
  // 运算符号：1大于，2大于等于，3小于，4小于等于，5等于
  const symbolList = [undefined, '>', '≥', '<', '≤', '=']
  return symbolList[val]
}
