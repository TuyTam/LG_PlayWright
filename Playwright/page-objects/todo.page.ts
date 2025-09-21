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
        await this.page.getByRole('link').filter({ hasText: `${itemName}` }).click();
        await this.page.waitForLoadState();
        await this.page.getByRole('button', { name: 'Add to cart' }).click();
        await this.page.waitForLoadState();

    }

    async goToCart() {
        await this.page.goto('https://demo.testarchitect.com/cart/', { timeout: 3000 });
        //await this.page.getByRole('link', { name: /\b\d+(?:.\d+)?\s*$/ }).first().click();
        await this.page.waitForURL(/cart/);
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState();

    }

    async removeItemFromCart() {
        if (await this.page.getByRole('link', { name: 'Remove' }).first().isVisible()) {
            await this.page.getByRole('link', { name: 'Remove' }).first().click();
            await this.page.waitForLoadState();
            await this.page.waitForTimeout(1000);
        }
    }
}
