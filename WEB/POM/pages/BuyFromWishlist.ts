import { Page, Locator, expect } from "@playwright/test";

export class BuyWishlist {
  page: Page;
  tableCart: Locator;
  rowCart: Locator;
  addToCart: Locator;
  constructor(page: Page) {
    this.page = page;
    this.tableCart = this.page.locator("#checkout-cart");
    this.rowCart = this.tableCart.locator("tbody");
    this.addToCart = this.page.getByRole('row', { name: 'HTC Touch HD HTC Touch HD Product 1 In Stock $146.00  ' }).getByRole('button');
  }
  async goToWishlist(){
    await this.page.goto(process.env.URL_WISHLIST_LTP!);
  }

  async buyWishList () {

  }
  async completeCheckout (){
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
    await this.page.getByRole("textbox", { name: "Post Code*" }).fill("1911");
    await this.page.locator("#input-payment-country").selectOption("10");
    await this.page.locator("#input-payment-zone").selectOption("156");
    await this.page
      .getByText("I have read and agree to the Terms & Conditions")
      .click();
    await this.page.getByRole("button", { name: "Continue " }).click();
    await this.page.getByRole("button", { name: "Confirm Order " }).click();
  }
}
