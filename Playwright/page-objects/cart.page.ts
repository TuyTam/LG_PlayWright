import { Locator, Page, expect } from "@playwright/test";

export class CartPage {

    private cartItems: Locator;
    private checkoutButton: Locator;

    constructor(private page: Page) {
        this.cartItems = this.page.locator(".et_b_header-cart").nth(0);
        this.checkoutButton = this.page.getByRole('link', { name: 'Proceed to checkout' });
    }

    async verifyItemInCart(expected: { itemName: string, itemPrice: string }) {
        let rowsCount = 0;
        const tablesCount = await this.page.getByRole('table').count();
        if (tablesCount > 1) {
            rowsCount = await this.page.getByRole('table').nth(0).getByRole('row').count();
        } else {
            rowsCount = await this.page.getByRole('table').getByRole('row').count();
        }

        console.log(`Total rows in cart: ${rowsCount}`);
        //skip the first row as it is header
        const row = this.page.getByRole('table').getByRole('row').nth(1);
        const nameLocator = row.getByRole('cell').nth(1).getByRole('link').first();
        const priceLocator = row.getByRole('cell').nth(2).locator('bdi');
        await expect(nameLocator).toHaveText(expected.itemName, { timeout: 5000 });
        await expect(priceLocator).toHaveText(expected.itemPrice, { timeout: 5000 });
    }

    async verifyMultipleItemsInCart(itemNames: string[]) {
        this.page.waitForTimeout(2000);
        const rows: Locator[] = await this.page.getByRole('table').getByRole('row').all();
        console.log(`Total rows in cart: ${rows.length}`);
        let itemFound = false;
        // Skip the header row
        // Check each item in the cart
        for (const item in itemNames) {
            console.log(`Verifying item in cart: ${item}`);
            for (let i = 1; i < rows.length; i++) {
                const rowText = await rows[i].innerText();
                if (rowText.includes(item)) {
                    itemFound = true;
                    console.log(`Item found in cart: ${item}`);
                    break;
                }

            }
            if (!itemFound) {
                throw new Error(`Item not found in cart: ${item}`);
            }
            itemFound = false; // reset for next item

        }

    }


    async verifyItemsCount(expectedCount: number) {
        await expect(this.cartItems).toHaveCount(expectedCount);
    }


    async proceedToCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForLoadState();
    }
}