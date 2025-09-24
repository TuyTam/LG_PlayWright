import { expect, Page } from "@playwright/test";

export class ProductPage {
    private addToCartButton;
    private cartLink;

    constructor(private page: Page) {
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
        this.cartLink = this.page.getByRole('link', { name: /\b\d+(?:.\d+)?\s*$/ }).first();
    }

    async addToCart() {
        await this.addToCartButton.click();
        await this.page.waitForLoadState();
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForLoadState();
    }

    async submitReview(reviewText: string, rating: string) {
        await this.page.getByRole('link', { name: 'Reviews' }).click();
        await this.page.locator('.comment-form-rating').getByRole('link', { name: `${rating}` }).click();
        await this.page.getByRole('textbox', { name: 'Your review' }).fill(reviewText);
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(5000);
    }

    async verifyReviewExists(reviewText: string, rating: string) {
        await this.page.getByRole('link', { name: 'Reviews' }).click();
        await expect(this.page.locator('#content_tab_reviews').getByRole('listitem').filter({ hasText: `${reviewText}` })).toContainText(`Rated ${rating}`);
    }

}