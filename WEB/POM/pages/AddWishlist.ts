import { expect, Locator, Page } from "@playwright/test";

export class addWishList {
    page: Page;
    goToCategory: Locator;
    selectCategory:Locator;
    addToWish: Locator;
    productIpod: Locator;
    productClock: Locator;
    productPhone: Locator;
    productOCamera: Locator;
    productApple: Locator;
    myAccount: Locator;
    goToDashoard: Locator;
    wishList: Locator;
    tableWishlist: Locator;
    rowWishlist: Locator;
    deleteBtn: Locator;



    constructor(page: Page) {
        this.page = page;
        this.addToWish = this.page.locator('.product-action > button:nth-child(2)').first();
        this.goToCategory = this.page.getByRole('button', { name: 'Shop by Category' });
        this.selectCategory = this.page.getByRole('link', { name: 'Software' });
        this.productIpod = this.page.getByRole('link', { name: 'iPod Touch iPod Touch iPod' });
        this.productClock = this.page.getByRole('link', { name: 'iPod Nano iPod Nano iPod Nano' });
        this.productPhone = this.page.getByRole('link', { name: 'HTC Touch HD HTC Touch HD HTC' });
        this.productOCamera = this.page.getByRole('link', { name: 'Palm Treo Pro Palm Treo Pro' });
        this.productApple = this.page.getByRole('link', { name: 'Apple Cinema 30&quot; Apple' });
        this.myAccount = this.page.getByRole('button', { name: ' My account' });
        this.goToDashoard = this.page.getByRole('link', { name: 'Dashboard' });
        this.wishList = this.page.getByRole('link', { name: ' Modify your wish list' });
        this.tableWishlist = this.page.locator("table.table.table-hover.border");
        this.rowWishlist = this.tableWishlist.locator("tbody");
        this.deleteBtn = this.page.locator(".btn btn-light btn-sm text-danger");

        
    }
    async goToMain(){
        await this.page.goto(process.env.URL_HOME_LTP!);
      }
    async AgregarWishlist() {
        await this.goToCategory.click();
        await this.selectCategory.click();
        await this.page.waitForLoadState("networkidle");
        await this.productIpod.hover();
        await expect(this.addToWish).toBeVisible();
        await this.addToWish.click();
        await this.productPhone.hover();
        await expect(this.addToWish).toBeVisible();
        await this.addToWish.click();
        await this.productOCamera.hover();
        await expect(this.addToWish).toBeVisible();
        await this.addToWish.click();
        await this.productApple.hover();
        await expect(this.addToWish).toBeVisible();
        await this.addToWish.click();
        await this.productClock.hover();
        await expect(this.addToWish).toBeVisible();
        await this.addToWish.click();
    }

    async goToWishlist (){
        await this.myAccount.click();
        await this.goToDashoard.click();
        await this.wishList.click();
        const row = await this.rowWishlist.locator("tr");
        for (let i = 0; i < await row.count(); i++) {
            const outOfStock = await row.nth(i).locator(".text").getByRole('cell', { name: 'Out Of Stock' }).first();
            const askStock = await row.nth(i).locator(".text-right").first();
            if (outOfStock === askStock.getByText("Out Of Stock")) {
                await this.deleteBtn.click();
                return;
            } else {
                return;
            }
            
        }
    }

    
}