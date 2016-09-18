export function compact(array) {
  const length = array ? array.length : 0;
  const result = [];
  let resIndex = 0;
  let index = -1;

  while (++index < length) {
    const value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}
