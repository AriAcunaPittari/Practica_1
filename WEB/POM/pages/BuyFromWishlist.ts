import { Page, Locator, expect } from "@playwright/test";

export class BuyWishlist {
  page: Page;
  table: Locator;
  row: Locator;
  goToCheckout: Locator;
  inputFirstName: Locator;
  inputLastName: Locator;
  company: Locator;
  address: Locator;
  city: Locator;
  postCode: Locator;
  inputPaymentCountry: Locator;
  inputPaymentZone: Locator;
  termsConditions: Locator;
  continueBtn: Locator;
  confirmOrderBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = this.page
      .locator(".table-responsive")
      .locator("table.table")
      .locator("tbody");
    this.row = this.table.locator("tr");
    this.goToCheckout = this.page.getByRole("link", { name: "Checkout " });
    this.inputFirstName = this.page.getByRole("textbox", {
      name: "First Name*",
    });
    this.inputLastName = this.page.getByRole("textbox", {
      name: "Last Name*",
    });
    this.company = this.page.getByRole("textbox", { name: "Company" });
    this.address = this.page.getByRole("textbox", { name: "Address 1*" });
    this.city = this.page.getByRole("textbox", { name: "City*" });
    this.postCode = this.page.getByRole("textbox", { name: "Post Code" });
    this.inputPaymentCountry = this.page.locator("#input-payment-country");
    this.inputPaymentZone = this.page.locator("#input-payment-zone");
    this.termsConditions = this.page.getByText(
      "I have read and agree to the Terms & Conditions"
    );
    this.continueBtn = this.page.getByRole("button", { name: "Continue " });
    this.confirmOrderBtn = this.page.getByRole("button", {
      name: "Confirm Order ",
    });
  }
  async goToWishlist() {
    await this.page.goto(process.env.URL_WISHLIST_LTP!);
  }

  async buyWishList() {
    //await this.page.pause();
    const addToCartProductONE = await this.page
      .getByRole("row", { name: "HTC Touch HD HTC Touch HD" })
      .getByRole("button");
    const addToCartProductTWO = await this.page
      .getByRole("row", { name: "iPod Nano iPod Nano Product 9" })
      .getByRole("button");
    await addToCartProductONE.click();
    await addToCartProductTWO.click();
    /*const rowList = await this.row;
    for (let i = 0; i < (await rowList.count()); i++) {
      const addOK = this.page.getByText("Success: You have modified");
      const column = await rowList.nth(i).locator("td");
      if (await this.addToCart.isVisible()) {
        await this.addToCart.click();
      }*/
  }
  async completeCheckout() {
    //const goToCart = this.page.locator("cart-icon").locator("svg").locator("use");
    //await this.page.pause();
    //await goToCart.waitFor({ state: "visible" });
    //await goToCart.click();
    await this.goToCheckout.click();
    if (await this.inputFirstName.isVisible()) {
      await this.inputFirstName.fill("Ariana");
      await this.inputLastName.fill("Acuña Pittari");
      await this.company.fill("Unknown");
      await this.address.fill("RamirezTestAdress");
      await this.city.fill("Buenos Aires");
      await this.postCode.fill("1911");
      await this.inputPaymentCountry.selectOption("10");
      await this.inputPaymentZone.selectOption("156");
      await this.termsConditions.click();
      await this.continueBtn.click();
      await this.confirmOrderBtn.click();
    } else {
      await this.termsConditions.click();
      await this.continueBtn.click();
      await this.confirmOrderBtn.click();
    }
  }
}
