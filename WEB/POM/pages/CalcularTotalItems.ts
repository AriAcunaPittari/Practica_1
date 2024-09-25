import { Locator, Page } from "@playwright/test";

export class calcularCheckout {
  page: Page;
  rowsCart: Locator;
  tableCart: Locator;
  headerCart: Locator;
  totalCart: number;
  totalItem: number;
  checkoutView: Locator;

  //subTotalLocator: Locator;
  constructor(page: Page) {
    this.page = page;
    this.tableCart = this.page.locator("#checkout-cart");
    this.headerCart = this.tableCart.locator("thead");
    this.rowsCart = this.tableCart.locator("tbody");
    this.totalCart = 0;
    this.totalItem = 0;
    this.checkoutView = this.page.getByRole('link', { name: 'Checkout' });
    // this.subTotalLocator =
  }
  async totalCartItems() {
    await this.checkoutView.click();
    const colsCart = this.rowsCart.first().locator("td");
    console.log("ColsCART count:" + (await colsCart.count()));
    //console.log("HeaderCART:" + (await this.headerCart.allTextContents));
    console.log("RowsCART:" + (await this.rowsCart.count()));

    // const quantityONE = this.rowsCart.filter({
    //   has: this.page.locator(""),
    // });
    
    // for (let i = 0; i < (await this.rowsCart.count()); i++) {
    const row = await this.page.locator("#checkout-cart").locator(".table").locator("tbody").locator("tr");
    for (let i = 0; i < await row.count(); i++) {
      const column = await row.nth(i);
      const quantity = await column.locator(".text-left")
        .locator("div.input-group")
        .locator('input[type="number"]')
        .getAttribute("value");

      console.log(`La cantidad de Quiantity es: ${quantity}`);
      const unitPrice = await column.locator(".text-right").first().innerText();
      const totalCartData = await column.locator(".text-right").last().innerText();

      console.log(`La cantidad es ${unitPrice}`);
      console.log(`El total es ${totalCartData}`);

      const quantityNumb = Number(quantity?.trim()); //trim quita los espacios
      const unitNumb = parseFloat(unitPrice?.replace("$", "").trim()); // Convertir el texto a número decimal
      console.log("Quantity:" + quantity);
      console.log("Unit:" + unitPrice);
      console.log("Parse:" + quantityNumb + " Unit " + unitNumb);

      const subTotal = quantityNumb * unitNumb;
      console.log("Subtotal:" + subTotal);
      this.totalCart = await this.totalCart + subTotal;
      console.log("Total:" + this.totalCart);
    }

    /*const totalItemText = await this.totalCart.textContent();
    console.log("totalitemText:" + totalItemText);
    this.totalItem = parseFloat(totalItemText?.replace("$", "").trim() || "0");
    console.log(this.totalItem);*/
  }
  async totalCheckoutFinal (){
    const envioLocator = await this.page.getByText("Flat Shipping Rate - $");
    const envioText = await envioLocator.textContent();
    const envioValue = parseFloat(
      envioText?.replace("Flat Shipping Rate - $", "").trim() || "0"
    );
    console.log(
      "parseFloat ENVIO:" +
        envioText?.replace("Flat Shipping Rate - $", "").trim()
    );
    this.totalCart = this.totalCart + envioValue;
    console.log("EnvioValue:" + envioValue);
    console.log("Envio Text:" + envioText);
    console.log("type" + typeof this.totalCart);
    console.log("Total Cart:" + this.totalCart);

    const totalCheckout = await this.page.locator("#checkout-total").locator("tbody tr").last().locator("strong").textContent();
    console.log(totalCheckout);
    //const totalCheckoutText = await totalCheckout.textContent();
    const totalCheckoutNumber = parseFloat(
      envioText?.replace("Flat Shipping Rate - $", "").trim() || "0"
    );

    if (totalCheckoutNumber === this.totalCart) {
      console.log("Los totales coinciden");
      return true;
    } else {
      console.log("Los totales son distintos");
      return false;
    }
  }

  }

