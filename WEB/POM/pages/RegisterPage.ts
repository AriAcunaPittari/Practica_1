import { Locator, Page } from "@playwright/test";

export class registerPage {
    page: Page;
    emailInput: Locator;
    passInput: Locator;
    fNameInput: Locator;
    lNameInput: Locator;
    registerButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.emailInput= page.locator("");
      this.passInput= page.locator("");
      this.fNameInput= page.locator("");
      this.lNameInput= page.locator("");
      this.registerButton= page.locator("");

    }
  
    async navigate() {
     // await this.page.goto(URL_LTP);
     await this.page.goto(process.env.URL_LTP!);
    }

    async register(){
      await this.page.getByPlaceholder('First Name').fill('Ariana');
      await this.page.getByPlaceholder('Last Name').click();
      await this.page.getByPlaceholder('Last Name').fill('Acu Pittari');
      await this.page.getByPlaceholder('E-Mail').click();
      await this.page.getByPlaceholder('E-Mail').fill('ariana@gmail.com');
      await this.page.getByPlaceholder('Telephone').click();
      await this.page.getByPlaceholder('Telephone').fill('123456789');
      await this.page.getByPlaceholder('Password', { exact: true }).click();
      await this.page.getByPlaceholder('Password', { exact: true }).fill('Ari123');
      await this.page.getByPlaceholder('Password Confirm').click();
      await this.page.getByPlaceholder('Password Confirm').fill('Ari123');
      await this.page.getByRole('button', { name: 'Continue' }).click();
      await this.page.locator("#input-password").click(); //id:# // class=. //type= usar .getbyrole
      await this.page.getByPlaceholder('Password', { exact: true }).fill('Ari123');
    }
    }