export function getNextIndex(current: number, length: number) {
  if (length === 0) return 0;
  return (current + 1) % length;
}

export function getPrevIndex(current: number, length: number) {
  if (length === 0) return 0;
  return (current - 1 + length) % length;
}
