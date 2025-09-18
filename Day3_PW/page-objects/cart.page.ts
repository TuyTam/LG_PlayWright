import { Locator, Page } from "@playwright/test";

export class CartPage {
    private miniCartContent: Locator;
    private checkoutButton: Locator;

    constructor(private page: Page) {
        this.miniCartContent = this.page.getByRole('table');
        this.checkoutButton = this.page.getByRole('link', { name: 'Proceed to checkout' });
    }
    async verifyItemInCart(expected: { itemName: string, itemPrice: string }): Promise<boolean> {
        let rowsCount = 0;
        const tablesCount = await this.page.getByRole('table').count();
        if (tablesCount > 1) {
            rowsCount = await this.page.getByRole('table').nth(0).getByRole('row').count();
        } else {
            rowsCount = await this.page.getByRole('table').getByRole('row').count();
        }

        console.log('Total rows in cart: ' + rowsCount);
        //skip the first row as it is header
        for (let i = 1; i < rowsCount; i++) {
            const row = this.page.getByRole('table').getByRole('row').nth(i);
            const name = await row.getByRole('cell').nth(1).getByRole('link').first().innerText({ timeout: 5000 });
            const price = await row.getByRole('cell').nth(2).locator('bdi').innerText({ timeout: 5000 });
            if (name === expected.itemName && price === expected.itemPrice) {
                return true;
            }


        }
        return false;
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForLoadState();
    }
}