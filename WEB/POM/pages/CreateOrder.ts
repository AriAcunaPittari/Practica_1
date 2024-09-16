import { Locator, Page, expect } from "@playwright/test";
import path from "path";

export class CreateOrder {
    page: Page;
    constructor (page:Page){
        this.page = page;
    }
}
