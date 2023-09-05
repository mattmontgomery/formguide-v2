export function getRollingPeriodAverages(
  values: number[],
  periodLength: number
): number[] {
  return values
    .filter((v) => v !== null && v !== undefined)
    .map((_, idx) => {
      const set = values.slice(idx, idx + periodLength);
      return set.length === periodLength
        ? set.reduce((a, b) => a + b, 0) / periodLength
        : -Infinity;
    })
    .filter((a) => a !== -Infinity);
}
export function getRollingPeriodSums(
  values: number[],
  periodLength: number
): number[] {
  return values
    .filter((v) => v !== null && typeof v !== "undefined")
    .map((_, idx) => {
      const set = values.slice(idx, idx + periodLength);
      return set.length === periodLength
        ? set.reduce((a, b) => a + b, 0)
        : -Infinity;
    })
    .filter((a) => a !== -Infinity);
}
export function getRollingSet<T>(values: T[], periodLength: number): T[][] {
  return values
    .filter((v) => v !== null && v !== undefined)
    .map((_, idx) => {
      const set = values.slice(idx, idx + periodLength);
      console.log(set);
      return set.length === periodLength ? set : [];
    });
}
