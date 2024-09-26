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
  }
  async viewCheckout(){
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
    await this.page.pause();
    //await this.page.locator('.custom-control').first().click();
    await this.page
      .getByRole("textbox", { name: "First Name*" })
      .fill("Ariana");
    await this.page
      .getByRole("textbox", { name: "Last Name*" })
      .fill("Acuña Pittari");
    await this.page.getByPlaceholder('Telephone').fill("123456789");
    await this.page.getByRole("textbox", { name: "Company" }).fill("Unknown");
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
  async ordenExitosa() {
    await this.page.goto(process.env.URL_SUCCESS_LTP!);
    await expect(this.successText).toHaveText(" Your order has been placed!");
  }
}

/////////////// Codigo guardado ///////////////
/*
// Constructores: --------------------------------------------
    this.quantityProduct2 = page
      .getByText("Product 9")
      .locator("..")
      .locator('td[class="text-right"]')
      .nth(2)
      .locator('input[name="quantity\[80522\]"]');
    this.row = page.getByText("Product 1").locator("..").locator('td[class="text-left"]').locator('div[class="input-group flex-nowrap]').locator('input[name="quantity\[80522\]"]');
    page
      .locator("div#checkout-cart")
      .locator("table.table")
      .locator("tbody")
      .locator("tr");
          this.quantityProduct1 = page
      .getByText("Product 1")
      .locator("..")
      .locator('td[class="text-left"]')
      .nth(2)
      .locator('input[name="quantity\[80521\]"]');

// Agregar Carrito:--------------------------------------------
  for (let i = 0; i < 3; i++) {
      await this.productONE.nth(i).hover();
      await this.addToCartONE.nth(i).click();
    }
    await this.page.waitForTimeout(1000);
    expect(
      this.page
        .locator("#notifivation-box-top")
        .locator("div.toast m-3 fade show")
        .first()
    ).toHaveAttribute("role", "alert"); //type:Role , Atributo: Alert.

        /*const unitNumberONE = await this.unitPriceProduct1.textContent();
    const quantityNumberTWO =
      await this.quantityProduct2.textContent();
      const quantityNumberONE = await this.quantityProduct1.textContent();
      const unitNumberTWO = await this.unitPriceProduct2.textContent();
      
      
      
      //////////////////////////////////////////////////////////////////////////////

     // totalITEMS
    for (let i = 0; i < await this.table.count(); i++) { // para hacerlo dinamico utilizamos el row.count
      const quantity = await this.table
        .nth(i)
        .locator("td.text-left")
        .nth(1)
        .locator("div.input-group")
        .locator('input[type="number"]')
        .getAttribute("value");

      console.log(`La cantidad es ${quantity}`);

      const unitPrice = await this.table
        .nth(i)
        .locator("td.text-right")
        .nth(1)
        .innerText();

      console.log(`La cantidad es ${unitPrice}`);

      const quantityNumbONE = Number(quantity?.trim());

      const unitNumbONE = parseFloat(unitPrice?.replace("$", "").trim() || "0"); // Convertir el texto a número decimal
      console.log("Quantity:" + quantity);
      console.log("Unit:" + unitPrice);
      console.log("Parse:" + quantityNumbONE + "Unit" + unitNumbONE);

      const subTotal = quantityNumbONE * unitNumbONE;
      console.log("Subtotal:" + subTotal);
      this.totalCart = this.totalCart + subTotal;
    }

    const envioLocator = await this.page.getByText("Flat Shipping Rate - $");
    const envioText = await envioLocator.textContent();
    const envioValue = parseFloat(envioText?.replace("Flat Shipping Rate - $", "").trim() || "0");
    console.log("parseFloat:" + envioText?.replace("Flat Shipping Rate - $", "").trim());
    this.totalCart = this.totalCart + envioValue;
    console.log("EnvioValue:" + envioValue);
    console.log("Envio Text:" + envioText);
    console.log("type" + typeof this.totalCart);
    console.log("Total Cart:" + this.totalCart);
    const totalItemText = await this.totalItemLocator.textContent();
    console.log("totalitemText:" + totalItemText);
    this.totalItem = parseFloat(totalItemText?.replace("$", "").trim() || "0");
    console.log(this.totalItem);
    await this.page.pause();
      */
