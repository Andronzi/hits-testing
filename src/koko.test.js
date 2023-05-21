import { describe, expect, test } from "@jest/globals";
import minEatingSpeed from "./koko.js";

const basicPilesArray = [30, 11, 23, 4, 20];

describe("basic tests", () => {
    test.each([
        [[3, 6, 7, 11], 8, 4],
        [[30, 11, 23, 4, 20], 8, 15],
        [[30, 11, 23, 4, 20], 12, 10],
        [[30, 11, 23, 4, 20], 13, 8]
    ])(
        "should return proper result when passed arguments are: %i, %i",
        (piles, h, result) => {
            expect(minEatingSpeed(piles, h)).toBe(result)
        }
    )
});

/*
CONSTRAINTS

1 <= piles.length <= 10^4
piles.length <= h <= 10^9
1 <= piles[i] <= 10^9

*/

describe("h less than piles array length", () => {
    test.each([[basicPilesArray.length - 1], [1], [0], [-1], [-10000]])
		("should return proper result when passed arguments are: %i, %i", (h) => {
        expect(() => minEatingSpeed(basicPilesArray, h)).toThrow();
    })
});

describe("check constrains for piles", () => {
	// Не могу протестить на длину = 1_000_000_000 + 1 из-за ошибки выделения памяти
	test.each([
		[[], 1], 
		[new Array(100).fill(0), 10], 
		[new Array(100).fill(1_000_000_001), 10], 
		[new Array(100).fill(10), 1_000_000_001]
	])
	("should return exception when passed arguments are: %i, %i", (piles, h) => {
		expect(() => minEatingSpeed(piles, h)).toThrow();
	})
});

describe("check that answer in the neighborhood with 1", () => {
  const arraySum = [...basicPilesArray].reduce((p, n) => p + n, 0);
	test.each([
		[basicPilesArray, arraySum, 1],
		[basicPilesArray, arraySum + 1, 1],
		[basicPilesArray, arraySum + 10000, 1],
		[basicPilesArray, arraySum - 1, 2]
	])
	("should return exception when passed arguments are: %i, %i", (piles, h, result) => {
		expect(minEatingSpeed(piles, h)).toBe(result);
	})
});