import { Page, Locator, expect } from "@playwright/test";

export class BuyWishlist {
  page: Page;
  table: Locator;
  row: Locator;
  //addToCart: Locator;
  constructor(page: Page) {
    this.page = page;
    this.table = this.page
      .locator(".table-responsive")
      .locator("table.table")
      .locator("tbody");
    this.row = this.table.locator("tr");
    //this.addToCart = this.row.locator("td").nth(5).locator(".button");
  }
  async goToWishlist() {
    await this.page.goto(process.env.URL_WISHLIST_LTP!);
  }

  async buyWishList() {
    await this.page.pause();
    const rowList = await this.row;
    for (let i = 0; i < (await rowList.count()); i++) {
      const addOK = this.page.getByText("Success: You have modified");
      const column = await rowList.nth(i).locator("td");
      const addToCart = await column.nth(5).getByRole('button');
      await addToCart.click();
      /*if (await this.addToCart.isVisible()) {
        await this.addToCart.click();
      }*/
    }
  }
  async completeCheckout() {
    //const goToCart = this.page.locator("cart-icon").locator("svg").locator("use");
    //await this.page.pause();
    //await goToCart.waitFor({ state: "visible" });
    //await goToCart.click();
    const goToCheckout = this.page.getByRole('link', { name: 'Checkout ' });
    await goToCheckout.click();
    await this.page
      .getByRole("textbox", { name: "First Name*" })
      .fill("Ariana");
    await this.page
      .getByRole("textbox", { name: "Last Name*" })
      .fill("Acuña Pittari");
    await this.page.getByRole("textbox", { name: "Company" }).click();
    await this.page
      .getByRole("textbox", { name: "Address 1*" })
      .fill("RamirezTestAdress");
    await this.page
      .getByRole("textbox", { name: "City*" })
      .fill("Buenos Aires");
    await this.page.getByRole("textbox", { name: "Post Code" }).fill("1911");
    await this.page.locator("#input-payment-country").selectOption("10");
    await this.page.locator("#input-payment-zone").selectOption("156");
    await this.page
      .getByText("I have read and agree to the Terms & Conditions")
      .click();
    await this.page.getByRole("button", { name: "Continue " }).click();
    await this.page.getByRole("button", { name: "Confirm Order " }).click();
  }
}
