import { Page } from "@playwright/test";

export class addReview {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
}