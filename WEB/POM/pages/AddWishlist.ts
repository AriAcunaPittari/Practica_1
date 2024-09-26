import { expect, Locator, Page } from "@playwright/test";
import { compileFunction } from "vm";

export class addWishList {
  page: Page;
  goToCategory: Locator;
  selectCategory: Locator;
  addToWish: Locator;
  productIpod: Locator;
  productCamera: Locator;
  productPhone: Locator;
  myAccount: Locator;
  goToDashoard: Locator;
  wishList: Locator;
  tableWishlist: Locator;
  rowWishlist: Locator;
  deleteBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToWish = this.page.getByRole("button", { name: "" });
    this.goToCategory = this.page.getByRole("button", {
      name: "Shop by Category",
    });
    this.selectCategory = this.page.getByRole("link", { name: "Software" });
    this.productIpod = this.page.getByRole("link", {
      name: "iPod Touch iPod Touch iPod",
    });
    this.productCamera = this.page.getByRole('link', { name: 'Canon EOS 5D Canon EOS 5D' });
    this.productPhone = this.page.getByRole("link", {
      name: "HTC Touch HD HTC Touch HD HTC",
    });
    this.myAccount = this.page.getByRole("button", { name: " My account" });
    this.goToDashoard = this.page.getByRole("link", { name: "Dashboard" });
    this.wishList = this.page.getByRole("link", {
      name: " Modify your wish list",
    });
    this.tableWishlist = this.page
      .locator(".table-responsive")
      .locator("table.table")
      .locator("tbody");
    this.rowWishlist = this.tableWishlist.locator("tr");
    this.deleteBtn = this.rowWishlist.locator("td").nth(5).locator("a");
  }
  async goToMain() {
    await this.page.goto(process.env.URL_HOME_LTP!);
  }
  async AgregarWishlist() {
    const addOK = await this.page.getByText("Success: You have added");
    //const goBack= await this.page.getByLabel('breadcrumb').getByRole('link', { name: 'Software' })
    await this.goToCategory.click();
    await this.selectCategory.click();
    await this.page.waitForLoadState("networkidle");
    await this.productIpod.click();
    //await this.addToWish.waitFor({state: "visible"});
    await this.addToWish.click();
    await addOK.waitFor({ state: "visible" });
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
    await this.productPhone.click();
    await this.addToWish.click();
    await addOK.waitFor({ state: "visible" });
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
    await this.productCamera.click();
    await this.addToWish.click();
    await addOK.waitFor({ state: "visible" });
    await this.page.getByRole("button", { name: "Close" }).click();
  }

  async goToWishlist() {
    await this.myAccount.click();
    //await this.goToDashoard.click();
    await this.wishList.click();
    const row = await this.rowWishlist;
    await this.page.pause();
    for (let i = await row.count(); i > 0; i--) {
      const removeOK = this.page.getByText("Success: You have modified");
      const column = await row.nth(i - 1).locator("td");
      const askStock = await column.nth(3).textContent();
         if (askStock === "Out Of Stock") {
            await this.deleteBtn.click();
            await removeOK.waitFor({ state: "visible" });
         }
      /*const outOfStock = await column.locator(".text-right").getByRole('cell', { name: 'Out Of Stock' });
      const outOfStockText = await outOfStock.textContent();
      console.log(outOfStockText);
      //const askStock = await column.locator(".text-right").last();
      const askStock = await column.nth(i).textContent();
      console.log(askStock);
      await this.page.pause();
      if (outOfStockText === askStock) {
        console.log(outOfStock);
        await this.page.pause();
        await this.deleteBtn.click();
        await removeOK.waitFor({ state: "visible" });
      }*/
    }
  }
}
