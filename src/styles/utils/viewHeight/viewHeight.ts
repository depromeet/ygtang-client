export function viewHeight(value: number) {
  return `calc(var(--var, 1vh) * ${value} - env(safe-area-inset-top) - env(safe-area-inset-bottom))`;
}

export function fullViewHeight() {
  return viewHeight(100);
}
