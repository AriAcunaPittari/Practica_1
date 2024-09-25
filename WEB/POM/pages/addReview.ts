import { expect, Locator, Page } from "@playwright/test";

export class addReview {
    page: Page;
    product: Locator;
    reviewName: Locator;
    reviewComment: Locator;
    selectStars: Locator;
    confirmReview: Locator;
    msjExitoReview:Locator;
    constructor(page: Page) {
        this.page = page;
        this.product = page.getByRole('link', { name: 'Samsung SyncMaster 941BW Samsung SyncMaster 941BW Samsung SyncMaster 941BW' });
        this.reviewName = page.getByPlaceholder('Your Name', { exact: true });
        this.reviewComment= page.getByPlaceholder('Your Review');
        this.selectStars = page.locator('#form-review').getByText('5', { exact: true });
        this.confirmReview = page.getByRole('button', { name: 'Write Review' });
        this.msjExitoReview = page.getByText('Thank you for your review. It');
    }
    async review(){
        await this.product.click();
        await this.reviewName.fill("Ariana");
        await this.reviewComment.fill("Excelente producto, lo he probado y funciona perfectamente, recomiendo al 100%!!");
        await this.selectStars.click();
        await this.confirmReview.click();
    }
    async sendReviewOK(){
        await expect(this.msjExitoReview).toHaveText("Thank you for your review. It has been submitted to the webmaster for approval.");
    }
}