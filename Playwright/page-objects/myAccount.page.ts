import { expect, Locator, Page } from "@playwright/test";
export class MyAccountPage {
    private ordersLink: Locator;

    constructor(private page: Page) {
        this.ordersLink = this.page.getByRole('link', { name: 'Orders' }).first();
    }

    async goToOrders() {
        await this.ordersLink.click();
        await this.page.waitForLoadState();
    }

    async verifyOrderDetailsDisplay() {
        expect(await this.page.getByRole('table').getByRole('row').count()).toBeGreaterThanOrEqual(3);
    }
}