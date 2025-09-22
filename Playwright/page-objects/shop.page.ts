import { Locator, Page } from "@playwright/test";


export class ShopPage {

    private shopLink: Locator;
    private productCards: Locator; // adjust selector

    constructor(private page: Page) {
        // this.shopLink = this.page.locator("a[href='/shop']");
        this.shopLink = this.page.locator('#menu-main-menu-1').getByRole('link', { name: 'Shop' })
        this.productCards = this.page.locator("products-list"); // adjust selector

    }

    async openShop() {
        await this.shopLink.click();
        await this.page.waitForLoadState();
    }

    async addItemToCart(itemName: string) {
        const itemCard = this.page.locator('.product-details').filter({ hasText: `${itemName}` });
        //const itemCard = this.page.locator('.product-details').filter({ hasText: `Beats Studio Wireless Over-Ear` });
        await itemCard.getByRole('link', { name: /Add/ }).first().click();
        console.log(`Added item: ${itemName} to cart`);
        await this.page.waitForTimeout(2000); // wait for 1 second to ensure the item is added
    }

    async addMultipleItemsToCart(selectedItems: string[]) {
        for (const item of selectedItems) {
            await this.addItemToCart(item);
        }
    }
}
