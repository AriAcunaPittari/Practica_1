import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    emailInput: Locator;
    passwordInput: Locator;
    infoEmail: string;
    infoPass: string;
    loginButton: Locator;

   // loginButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.infoEmail = process.env.EMAIL_LTP!;
      this.infoPass = process.env.PASS_LTP!;
      this.emailInput = page.locator("");
      this.passwordInput = page.locator("");
      this.loginButton = page.locator("");

    }
  
    async navigate() {
     // await this.page.goto(URL_LTP);
     await this.page.goto(process.env.URL_LTP!);
    }

    
  
    async login(email: string, password: string) {
      await this.emailInput.fill(this.infoEmail);
      await this.passwordInput.fill(this.infoPass);
      //await this.loginButton.click();
    }
  }