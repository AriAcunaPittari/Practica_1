import { Locator, Page, expect } from "@playwright/test";

export class Changeinfo {
  page: Page;
  editButton: Locator;
  //infoEmail: string;
  //infoPass: string;
  successChange: Locator;
  FirstNameChange: Locator;
  LastNameChange: Locator;

  constructor(page: Page) {
    this.page = page;
    //this.infoEmail = process.env.EMAIL_LTP!;
    //this.infoPass = process.env.PASS_LTP!;
    this.editButton = page.getByRole("link", { name: " Edit your account" });
    this.successChange = page.getByText("Success: Your account has");
    this.FirstNameChange = page.getByPlaceholder("First Name");
    this.LastNameChange = page.getByPlaceholder("Last Name");
  }
  async navigateAccount(){
    await this.page.goto(process.env.URL_ACCOUNT_LTP!);
  }

  async ChangeInfo() {
    await this.editButton.click();
    await this.FirstNameChange.click();
    await this.FirstNameChange.fill("Ariana Changed");
    await this.LastNameChange.click();
    await this.LastNameChange.fill("Acu Pittari Changed");
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
  async ChangeSuccess() {
    await expect(this.successChange).toHaveText("Success: Your account has been successfully updated.");
  }
}
