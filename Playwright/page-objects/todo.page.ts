import { Locator, Page } from "@playwright/test";
export class TodoPage {

    constructor(private page: Page) { }


    async goToHomePage() {
        await this.page.goto('https://demo.testarchitect.com/');
        await this.page.getByRole('button', { name: 'Close' }).click();
    }

    async goToDepartment(departmentName: string) {
        await this.page.getByText('All departments').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByText('Automobiles & Motorcycles Car').getByRole('link').filter({ hasText: departmentName }).click();

    }



    async addItemToCart(itemName: string) {
        await this.page.getByRole('link').filter({ hasText: `${itemName}` }).click();
        await this.page.waitForLoadState();
        await this.page.getByRole('button', { name: 'Add to cart' }).click();
        await this.page.waitForLoadState();

    }

    async goToCart() {
        await this.page.goto('https://demo.testarchitect.com/cart/');
        //await this.page.getByRole('link', { name: /\b\d+(?:.\d+)?\s*$/ }).first().click();
        await this.page.waitForURL(/cart/);
        await this.page.waitForLoadState();

    }

    async goToCheckOut() {
        await this.page.goto('https://demo.testarchitect.com/checkout/');
        await this.page.waitForURL(/checkout/);
        await this.page.waitForLoadState();
    }

    async goToMyAccount() {
        await this.page.goto('https://demo.testarchitect.com/my-account/');
        await this.page.waitForURL(/my-account/);
        await this.page.waitForLoadState();
    }

    async removeItemFromCart() {
        if (await this.page.getByRole('link', { name: '$0.00' }).isVisible()) {
            console.log('No item in cart at the beginning');
        }
        else {
            await this.goToCart();
            while (await this.page.getByRole('link', { name: 'Remove' }).first().isVisible()) {
                await this.page.getByRole('link', { name: 'Remove' }).first().click();
                await this.page.waitForLoadState();
                console.log(`Removed item from cart.`);
            }
        }

    }
}
