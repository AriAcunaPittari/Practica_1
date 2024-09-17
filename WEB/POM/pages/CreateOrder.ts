import { Locator, Page, expect } from "@playwright/test";
//Quantity x UnitPrice = TotalItems... TotalItems==TotalCart

export class CreateOrder {
  page: Page;
  totalItem: Locator;
  totalCart: Locator;
  quantityProduct1: Locator;
  unitPriceProduct1: Locator;
  checkoutBtn: Locator;
  addToCartONE: Locator;
  addToCartTWO: Locator;
  goToCart: Locator;
 productONE: Locator;
  productTWO: Locator;
  goToCategory: Locator;
  selectCategory: Locator;
  successText: Locator;
  constructor(page: Page) {
    this.page = page;
    this.quantityProduct1 = page.getByRole('button', { name: '0' });
    this.unitPriceProduct1 = page.getByRole('cell', { name: '$146.00' }).nth(2);
    this.checkoutBtn = page.getByRole("button", { name: " Checkout" });
    this.addToCartONE = page.locator(".product-action > button").first();
    this.addToCartTWO = page.locator("div:nth-child(8) > .product-thumb > .product-thumb-top > .product-action > button").first();
    this.goToCart = page.getByRole("button", { name: " Edit cart" });
    this.totalItem =
    this.totalCart =
    this.productONE = page.getByRole('link', { name: 'HTC Touch HD HTC Touch HD HTC' });
    this.productTWO = page.getByRole('link', { name: 'iPod Nano iPod Nano iPod Nano' });
    this.goToCategory = page.getByRole("button", { name: "Shop by Category" });
    this.selectCategory = page.getByRole("link", {name: "Phone, Tablets & Ipod",});
    this.successText = page.getByRole('heading', { name: ' Your order has been placed!' });
  }
  async viewCategory() {
    // Navigate al carrito.
    await this.goToCategory.click();
    await this.selectCategory.click();
  }
  async agregarCarritoUNO() {
    // Buscar un item desde categoria y agregarlo al carrito
    await this.productONE.hover();
    await expect(this.addToCartONE).toBeVisible();
    await this.addToCartONE.click();
  }
  async agregarCarritoDOS() {
    // Same Y CLICKEAR EL CARRITO
    await this.productTWO.hover();
    await expect(this.addToCartTWO).toBeVisible();
    await this.addToCartTWO.click();
  }

  async viewCart() {
    // Navigate al carrito.
    await this.page.getByRole('button', { name: '0' }).click();
    await this.goToCart.click();
  }

  async calcularTotalItems() {
    //Quantity x UnitPrice = TotalItems
  }
  async calcularTotalCheckout() {
    //TotalItems==TotalCart (expect)
  }
  async finalizarCompra() {
    // Completar los datos requeridos
    await this.checkoutBtn.click();
    await this.page.getByRole("textbox", { name: "First Name*" }).fill("Ariana");
    await this.page.getByRole("textbox", { name: "Last Name*" }).fill("Acuña Pittari");
    await this.page.getByRole("textbox", { name: "Company" }).click();
    await this.page.getByRole("textbox", { name: "Address 1*" }).fill("RamirezTestAdress");
    await this.page.getByRole("textbox", { name: "City*" }).fill("Buenos Aires");
    await this.page.getByRole("textbox", { name: "Post Code*" }).fill("1911");
    await this.page.locator("#input-payment-country").selectOption("10");
    await this.page.locator("#input-payment-zone").selectOption("156");
    await this.page.getByText("I have read and agree to the Terms & Conditions").click();
    await this.page.getByRole('button', { name: 'Continue ' }).click();
    await this.page.getByRole('button', { name: 'Confirm Order ' }).click();
  }
  async ordenExitosa(){
    await this.page.goto(process.env.URL_SUCCESS_LTP!);
    await expect(this.successText).toHaveText("Your order has been placed!");
  }
}
