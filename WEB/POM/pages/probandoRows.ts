import { Locator, Page } from "@playwright/test";

export class testingRows {
  page: Page;
  rowsCart: Locator;
  tableCart: Locator;
  tableTotal: Locator;
  headerCart: Locator;
  totalCart: number;
  totalItem: number;
  constructor(page: Page) {
    this.page = page;
    this.tableCart = page.locator("#checkout-cart");
    this.tableTotal = page.locator("#checkout-total");
    this.headerCart = this.tableCart.locator("thead");
    this.rowsCart = this.tableCart.locator("tbody tr");
    this.totalCart = 0;
    this.totalItem = 0;

    //this.elementos = page.locator("");
  }
  async totalCartAndCheckout() {
    const colsCart = this.rowsCart.first().locator("td");
    console.log("ColsCART count:" + (await colsCart.count()));
    //console.log("HeaderCART:" + (await this.headerCart.allTextContents));
    console.log("RowsCART:" + (await this.rowsCart.count()));

    // const quantityONE = this.rowsCart.filter({
    //   has: this.page.locator(""),
    // });
    for (let i = 0; i < (await this.rowsCart.count()); i++) {
      const quantity = await this.rowsCart
        .nth(i)
        .locator("td")
        .locator("div.input-group")
        .locator('input[type="number"]')
        .getAttribute("value");

      console.log(`La cantidad es ${quantity}`);

      const unitPrice = await this.rowsCart
        .nth(i)
        .locator("td.text-right")
        .first()
        .innerText();

      const totalCartData = await this.rowsCart
        .nth(i)
        .locator("td.text-right")
        .last()
        .innerText();

      console.log(`La cantidad es ${unitPrice}`);
      console.log(`La cantidad es ${totalCartData}`);

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
    const envioValue = parseFloat(
      envioText?.replace("Flat Shipping Rate - $", "").trim() || "0"
    );
    console.log(
      "parseFloat:" + envioText?.replace("Flat Shipping Rate - $", "").trim()
    );
    this.totalCart = this.totalCart + envioValue;
    console.log("EnvioValue:" + envioValue);
    console.log("Envio Text:" + envioText);
    console.log("type" + typeof this.totalCart);
    console.log("Total Cart:" + this.totalCart);

    const totalItemText = await totalCartData.textContent();
    console.log("totalitemText:" + totalItemText);
    this.totalItem = parseFloat(totalItemText?.replace("$", "").trim() || "0");
    console.log(this.totalItem);
  }
}
