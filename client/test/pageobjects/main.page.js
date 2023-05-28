/* eslint-disable no-undef */
import Page from "./page.js";

class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputPiles() {
    return $("#inputPiles");
  }

  get pilesList() {
    return $("#piles-list");
  }

  get inputPileValue() {
    return $$("#inputPileValue");
  }

  get hValue() {
    return $("#inputH");
  }

  get calcBtn() {
    return $("#calc-button");
  }

  get result() {
    return $("#result");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async setPilesList(piles) {
    try {
      await this.open();
      await this.inputPiles.setValue(piles);
      await this.pilesList.waitForDisplayed({ timeout: 1000 });
      await this.inputPileValue.map((inputPile) => inputPile.setValue(5));
      await this.hValue.setValue(7);
    } catch (e) {
      console.log(e);
      throw new Error("Не удалось создать список кусочков");
    }
  }

  async calcPiles() {
    await this.calcBtn.click();
    await this.result.waitForDisplayed({ timeout: 1000 });
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("");
  }
}

export default new LoginPage();
