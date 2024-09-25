import { expect, Locator, Page } from "@playwright/test";

export class loginOut {
  page: Page;
  loginOutButton: Locator;
  myAccount: Locator;
  validateLogout: Locator;
  continueBtn: Locator;
  constructor(page: Page) {
    this.page = page;
    this.loginOutButton = page.getByRole("link", {
      name: "Logout",
      exact: true,
    });
    this.myAccount = page.getByRole("button", { name: " My account" });
    this.validateLogout = page.getByRole("heading", {
      name: " Account Logout",
    });
    this.continueBtn = page.getByRole("heading", { name: " Account Logout" });
  }
  async logOut() {
    await this.myAccount.hover();
    await this.loginOutButton.click();
  }
  async confirmLogout(){
    await expect(this.validateLogout).toHaveText("Account Logout");
    await this.continueBtn.click();
}
}
