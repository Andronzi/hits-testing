import MainPage from "../pageobjects/main.page.js";

describe("My application", () => {
  it("should show piles list", async () => {
    await MainPage.setPilesList(7);
    await MainPage.calcPiles();
    await browser.pause(10000);
  });
});
