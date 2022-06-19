export function viewHeight(value: number) {
  return `calc(var(--var, 1vh) * ${value})`;
}

export function fullViewHeight() {
  return viewHeight(100);
}
