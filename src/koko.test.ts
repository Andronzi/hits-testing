import { describe, expect, test } from "@jest/globals";
import minEatingSpeed from "./koko.js";

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