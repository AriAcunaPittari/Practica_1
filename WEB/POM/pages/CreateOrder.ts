import { Locator, Page, expect } from "@playwright/test";
//Quantity x UnitPrice = TotalItems... TotalItems==TotalCart

export class CreateOrder {
  page: Page;
  checkoutBtn: Locator;
  addToCartONE: Locator;
  addToCartTWO: Locator;
  goToCart: Locator;
  productONE: Locator;
  productTWO: Locator;
  goToCategory: Locator;
  selectCategory: Locator;
  successText: Locator;
  infoEmail: string;
  infoPass: string;
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
  phoneNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.infoEmail = process.env.EMAIL_LTP!;
    this.infoPass = process.env.PASS_LTP!;
    this.checkoutBtn = page.getByRole("link", { name: "Checkout" });
    this.addToCartONE = page.locator(".product-action > button").first();
    this.addToCartTWO = page
      .locator(
        "div:nth-child(8) > .product-thumb > .product-thumb-top > .product-action > button"
      )
      .first();
    this.goToCart = page.getByRole("link", { name: "View Cart " });
    this.productONE = page.getByRole("link", {
      name: "HTC Touch HD HTC Touch HD HTC",
    });
    this.productTWO = page.getByRole("link", {
      name: "iPod Nano iPod Nano iPod Nano",
    });
    this.goToCategory = page.getByRole("button", { name: "Shop by Category" });
    this.selectCategory = page.getByRole("link", {
      name: "Phone, Tablets & Ipod",
    });
    this.successText = page.getByRole("heading", {
      name: " Your order has been placed!",
    });
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
    this.phoneNumber = this.page.getByPlaceholder("Telephone");
  }
  async viewCheckout() {
    await this.page.goto(process.env.URL_CHECKOUT_LTP!);
  }
  async viewCategory() {
    //Metodos
    // Navigate al carrito.
    await this.goToCategory.click();
    await this.selectCategory.click();
  }
  async agregarCarritoUNO() {
    // Buscar un item desde categoria y agregarlo al carrito
    await this.page.waitForLoadState("networkidle");
    await this.productONE.hover();
    await expect(this.addToCartONE).toBeVisible();
    await this.addToCartONE.click();
  }
  async agregarCarritoDOS() {
    // Same
    //await this.page.waitForLoadState('networkidle');
    await this.productTWO.hover();
    await expect(this.addToCartTWO).toBeVisible();
    await this.addToCartTWO.click();
  }

  async viewCart() {
    // Ir al carrito.
    await this.goToCart.click();
  }

  async finalizarCompra() {
    // Completar los datos requeridos
    //await this.page.locator('#payment-address').getByText('I want to use a new address').check();
    //await this.page.pause();
    //await this.page.locator('.custom-control').first().click();
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
  async ordenExitosa() {
    await this.page.goto(process.env.URL_SUCCESS_LTP!);
    await expect(this.successText).toHaveText(" Your order has been placed!");
  }
}
