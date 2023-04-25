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

1 <= piles.length <= 104
piles.length <= h <= 109
1 <= piles[i] <= 109

*/

describe("h less than piles array length", () => {
    test.each([[basicPilesArray.length - 1], [1], [0], [-1], [-10000]])("should return proper result when passed arguments are: %i, %i", (h) => {
        expect(() => minEatingSpeed(basicPilesArray, h)).toThrow();
    })
});
