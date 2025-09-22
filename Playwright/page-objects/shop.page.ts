import { expect, Locator, Page } from "@playwright/test";


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

    async selectViewMode(viewMode: string) {
        if (viewMode === 'grid') {
            await this.page.locator('.switch-grid').click();
            await this.page.waitForURL(/view_mode=grid/);
        } else if (viewMode === 'list') {
            await this.page.locator('.switch-list').click();
            await this.page.waitForURL(/view_mode=list/);
        }
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

    async sortItemsByPrice(sortType: string) {
        //sortType is low to high / high to low
        const filterCombobox = this.page.getByLabel('Shop order');
        await filterCombobox.selectOption(`Sort by price: ${sortType}`);
        await this.page.waitForTimeout(5000);
    }

    async verifyOrderOfItems(sortType: string) {
        const productDetail: Locator[] = await this.page.locator('.product-details').all();

        const pricesTexts: string[] = await Promise.all(productDetail.map(async (item) => {
            return (await item.locator('bdi').count()) > 1
                ? await item.locator('bdi').nth(1).innerText()
                : await item.locator('bdi').first().innerText();
        }));

        const prices = pricesTexts.map((text) =>
            parseFloat(text.replace(/[^0-9.]/g, "")) // keep only numbers + decimals
        );

        console.log(`***** Sort prices ${sortType} `);
        console.log(`**Actual: ${sortType} : ${prices.toString()}`);
        const sorted = prices.sort((a, b) => sortType === "low to high" ? a - b : b - a);

        console.log(`**Sorted: ${sortType} : ${prices.toString()}`);
        expect(prices).toEqual(sorted);
    }
}
