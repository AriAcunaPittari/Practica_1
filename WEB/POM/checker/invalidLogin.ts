import { Locator, Page, expect } from "@playwright/test";

export class InvalidLogin {
  page: Page;
  warningText: Locator;
  constructor(page: Page) {
    this.page = page;
    this.warningText = page.getByText("Warning: No match for E-Mail");
  }
  async wrongEmail() {
    await expect(this.warningText).toHaveText("Warning: No match for E-Mail");
  }
  async wrongPass() {
    await expect(this.warningText).toHaveText("Warning: No match for E-Mail");
  }
}
