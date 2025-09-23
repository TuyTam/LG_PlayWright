import { Locator, Page, expect } from "@playwright/test";
import { DateUtils } from "../utils/DateUtils";
export class OrderStatusPage {
    private orderStatus: Locator;

    constructor(private page: Page) {
        this.orderStatus = this.page.getByRole('heading', { name: 'Order received' });
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

        await expect(this.page.getByText('Date:')).toContainText(DateUtils.getCurrentDateFormatted());

    }

}
