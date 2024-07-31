export function validatorLocation(coordinate) {
  if (coordinate == "" || coordinate == null || coordinate == 0) {
    return false;
  }

  const regex =
    /\[\s*(\d+\.\d+)\s*,\s*([-]?\d+\.\d+)\s*\]|\s*(\d+\.\d+)\s*,\s*([-]?\d+\.\d+)\s*/g;
  return regex.test(coordinate);
}
