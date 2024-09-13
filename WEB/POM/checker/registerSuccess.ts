import { Locator, Page, expect } from "@playwright/test";
//import { registerPage } from "../pages/RegisterPage";

export class registerSuccess {
  page: Page;
  accountRegisterOK: Locator;
  //URLAccount: string;
  URLSuccess: string;

  constructor(page: Page) {
    this.page = page;
    this.accountRegisterOK = page.getByRole("heading", {
      name: " Your Account Has Been",
    });
    //this.URLAccount = process.env.URL_HOME_LTP!;
    this.URLSuccess = process.env.URL_SUCCESS_LTP!;
  }
  async navigate() {
    await this.page.goto(process.env.URL_SUCCESS_LTP!);
  }
  async VerifyRegisterSuccess() {
    await expect(this.accountRegisterOK).toHaveText(
      "Your Account Has Been Created!"
    );
  }
  async VerifyMyAccount() {
    await this.page.getByRole("link", { name: "Continue" }).click();
    await expect(this.URLSuccess).toContain("account");
  }
}
