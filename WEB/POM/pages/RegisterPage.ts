import { Locator, Page } from "@playwright/test";

export class registerPage {
    page: Page;
    emailInput: Locator;
    passwordInput: Locator;
    fNameInput: Locator;
    lNameInput: Locator;
   // loginButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
       page.getByRole('link', { name: 'Register', exact: true }).click();
       page.getByPlaceholder('First Name').click();
       page.getByPlaceholder('Last Name').click();
       this.emailInput = page.getByPlaceholder('E-Mail');
       page.getByPlaceholder('Telephone').click();
       //page.getByPlaceholder('Password', { exact: true }).click();
       this.passwordInput = page.locator("text=password");
       page.locator("text=confirm").click();
       page.getByRole('button', { name: 'Continue' }).click();
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
      await this.page.getByPlaceholder('Password', { exact: true }).press('CapsLock');
      await this.page.getByPlaceholder('Password', { exact: true }).fill('A');
      await this.page.getByPlaceholder('Password', { exact: true }).press('CapsLock');
      await this.page.getByPlaceholder('Password', { exact: true }).fill('Ari123');
      await this.page.getByPlaceholder('Password Confirm').click();
      await this.page.getByPlaceholder('Password Confirm').fill('Ari123');
      await this.page.getByRole('button', { name: 'Continue' }).click();

    }