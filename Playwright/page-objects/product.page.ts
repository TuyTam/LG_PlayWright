import { Page } from "@playwright/test";

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

}