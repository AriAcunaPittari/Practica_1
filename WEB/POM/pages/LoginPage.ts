import { Locator, Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  infoEmail: string;
  infoPass: string;
  loginButton: Locator;
  infoEmailWrong: string;
  infoPassWrong: string;

  constructor(page: Page) {
    this.page = page;
    this.infoEmail = process.env.EMAIL_LTP!;
    this.infoPass = process.env.PASS_LTP!;
    this.emailInput = page.getByPlaceholder("E-Mail Address");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.infoEmailWrong = process.env.WRONG_EMAIL_LTP!;
    this.infoPassWrong = process.env.WRONG_PASS_LTP!;
  }

  async navigate() {
    // await this.page.goto(URL_LTP);
    await this.page.goto("/");
  }
  async navigateToLogin(){
    await this.page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
  }
  async loginOK() {
    await this.page.getByRole("button", { name: " My account" }).click();
    //await this.page.getByRole("link", { name: "Login", exact: true }).click();
    await this.emailInput.click();
    await this.emailInput.fill(this.infoEmail);
    await this.passwordInput.click();
    await this.passwordInput.fill(this.infoPass);
    await this.loginButton.click();
  }

  async loginStorage() {
    await this.page.getByRole("button", {
      name: " My account",
    }).waitFor({ state: "visible" });
    const btnMyAccount = await this.page.getByRole("button", {
      name: " My account",
    });
    await btnMyAccount.waitFor({ state: "visible" });
    await btnMyAccount.click();
    if (await this.loginButton.isVisible()) {
      //await this.page.getByRole("link", { name: "Login", exact: true }).click();
      await this.emailInput.click();
      await this.emailInput.fill(this.infoEmail);
      await this.passwordInput.click();
      await this.passwordInput.fill(this.infoPass);
      await this.loginButton.click();
      //const storageState = await this.page.context().storageState();
      await this.page
        .context()
        .storageState({ path: "web/context/storageLogin.json" });
    }
  }
  async loginFail() {
    await this.page.getByRole("button", { name: " My account" }).click();
    //await this.page.getByRole("link", { name: "Login", exact: true }).click();
    await this.emailInput.click();
    await this.emailInput.fill(this.infoEmailWrong);
    await this.passwordInput.click();
    await this.passwordInput.fill(this.infoPassWrong);
    await this.loginButton.click();
  }
}
