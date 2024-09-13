import { Locator, Page } from "@playwright/test";


export class registerPage {
  page: Page;
  emailInput: Locator;
  passInputSet: Locator;
  passInputConfirm: Locator;
  fNameInput: Locator;
  lNameInput: Locator;
  registerButton: Locator;
  phoneInput: Locator;
  infoEmail: string;
  infoPass: string;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("E-Mail");
    this.passInputSet = page.getByPlaceholder("Password", { exact: true });
    this.fNameInput = page.getByPlaceholder("First Name");
    this.lNameInput = page.getByPlaceholder("Last Name");
    this.registerButton = page.getByRole("button", { name: "Continue" });
    this.infoEmail = process.env.EMAIL_LTP!;
    this.infoPass = process.env.PASS_LTP!;
    this.phoneInput = page.getByPlaceholder("Telephone");
    this.passInputConfirm = page.getByPlaceholder("Password Confirm");
  }

  async navigate() {
    // await this.page.goto(URL_LTP);
    await this.page.goto(process.env.URL_HOME_LTP!);
  }

  async register() {
    await this.page.getByRole("button", { name: " My account" }).click();
    await this.page.getByRole("link", { name: " Register" }).click();
    await this.fNameInput.fill("Ariana");
    await this.lNameInput.click();
    await this.lNameInput.fill("Acu Pittari");
    await this.emailInput.click();
    await this.emailInput.fill(this.infoEmail);
    await this.phoneInput.click();
    await this.phoneInput.fill("123456789");
    await this.passInputSet.click();
    await this.passInputSet.fill(this.infoPass);
    await this.passInputConfirm.click();
    await this.passInputConfirm.fill(this.infoPass);
    await this.page.getByText("I have read and agree to the").click();
    await this.registerButton.click();
    // await this.page.locator("#input-password").click(); //id:# // class=. //type= usar .getbyrole
  }
}
