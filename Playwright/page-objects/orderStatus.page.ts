import { Locator, Page, expect } from "@playwright/test";
export class OrderStatusPage {
    private orderStatus: Locator;
    private orderDetailsSection: Locator;

    constructor(private page: Page) {
        this.orderStatus = this.page.getByRole('heading', { name: 'Order received' });
        this.orderDetailsSection = this.page.getByRole('list').filter({ hasText: 'Order number' });
    }

    async verifyOrderStatus() {
        return this.orderStatus.isVisible();
    }

    async verifyOrderDetails(expected: { itemName: string, itemPrice: string, email: string }) {
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(3000); //wait for 3 seconds to ensure the page is fully loaded
        await expect(this.page.getByText('Order number:')).toBeVisible();

        await expect(this.page.getByText('Email:')).toContainText(expected.email);
        await expect(this.page.getByRole('listitem').filter({ hasText: 'Total:' })).toContainText(expected.itemPrice);
        await expect(this.page.getByRole('listitem').filter({ hasText: 'Payment method: Direct bank' })).toBeVisible();

        // Get current date in "Month Day, Year" format
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Assert the date field displays the correct format
        await expect(this.page.getByText('Date:')).toContainText(formattedDate);

    }

}
