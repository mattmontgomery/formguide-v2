import { describe, expect, test } from "@jest/globals";
import { getRollingPeriodAverages, getRollingPeriodSums } from "./rolling";

test("calculates the correct average values for a five-period rolling dataset", () => {
  const dataset = [0, 0, 1, 3, 3, 1, 3, 1, 3];

  const expectedRolling = [7 / 5, 8 / 5, 11 / 5, 11 / 5, 11 / 5];
  const received = getRollingPeriodAverages(dataset, 5);
  expect(received).toEqual(expectedRolling);
});
test("calculates the correct sum values for a five-period rolling dataset", () => {
  const dataset = [0, 0, 1, 3, 3, 1, 3, 1, 3];

  const expectedRolling = [7, 8, 11, 11, 11];
  const received = getRollingPeriodSums(dataset, 5);
  expect(received).toEqual(expectedRolling);
});
