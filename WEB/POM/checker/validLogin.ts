import { Locator, Page, expect } from "@playwright/test";

export class okLogin {
  page: Page;
  URLAccount: string;
  signInbutton: Locator;
  emailInput: Locator;
  passInput: Locator;
  infoEmail: string;
  infoPass: string;

  constructor(page: Page) {
    this.page = page;
    this.URLAccount = process.env.URL_ACCOUNT_LTP!;
    this.signInbutton = page.locator("[value='Login']");
    this.emailInput = page.locator("#userEmail");
    this.passInput = page.locator("#userPassword");
    this.infoEmail = process.env.EMAIL_LTP!;
    this.infoPass = process.env.PASS_LTP!;
  }
  async validLogin() {
    await this.emailInput.fill(this.infoEmail);
    await this.emailInput.fill(this.infoPass);
    await this.signInbutton.click();
  }
}
