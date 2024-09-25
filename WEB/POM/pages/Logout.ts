import { Page } from "@playwright/test";

export class loginOut {
    page: Page;
    constructor (page: Page){
        this.page = page;
    }
}