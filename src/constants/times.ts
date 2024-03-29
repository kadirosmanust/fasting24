export const hours = Array(24)
  .fill('')
  .map((_, i) => (i < 10 ? '0' + i : '' + i));
export const minutes = Array(60)
  .fill('')
  .map((_, i) => (i < 10 ? '0' + i : '' + i));
