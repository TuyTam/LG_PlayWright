import { Locator, Page, expect } from "@playwright/test";
import { Customer } from "../page-objects/Customer";

export class CheckoutPage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly companyName: Locator;
    readonly countryRegion: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phone: Locator;
    readonly email: Locator;
    readonly orderNotes: Locator;
    readonly placeOrderButton: Locator;

    constructor(private page: Page) {
        this.firstName = page.getByRole('textbox', { name: 'First name' });
        this.lastName = page.getByRole('textbox', { name: 'Last name' });
        this.companyName = page.getByRole('textbox', { name: 'Company name (optional)' });
        this.countryRegion = page.getByRole('combobox', { name: 'Country / Region' });
        this.streetAddress = page.getByRole('textbox', { name: 'Street address' });
        this.city = page.getByRole('textbox', { name: 'Town / City' });
        this.state = page.getByRole('combobox', { name: 'State' });
        this.zipCode = page.getByRole('textbox', { name: 'ZIP Code' });
        this.phone = page.getByRole('textbox', { name: 'Phone' });
        this.email = page.getByRole('textbox', { name: 'Email address' });
        this.orderNotes = page.getByRole('textbox', { name: 'Order notes' });
        this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
    }

    async verifyCheckoutPage() {
        await expect(this.page).toHaveTitle('Checkout – TestArchitect Sample Website');
    }

    async fillBillingInfo(customer: Customer, orderNotes: string) {
        console.log('Filling billing info with customer:', customer.printInfo());
        await this.firstName.fill(customer.firstName);
        await this.lastName.fill(customer.lastName);
        if (customer.company && customer.company.trim() !== '') {
            await this.companyName.fill(customer.company);
        }
        await this.countryRegion.click();
        await this.page.getByRole('option', { name: `${customer.country}`, exact: true }).click();
        await this.streetAddress.fill(customer.address);
        await this.city.fill(customer.city);
        await this.state.click();
        await this.page.getByRole('option', { name: `${customer.state}` }).click();
        await this.zipCode.fill(customer.zipCode);
        await this.phone.fill(customer.phone);
        await this.email.fill(customer.email);
        await this.orderNotes.fill(orderNotes);
    }

    async verifyOrderSummary(expected: { itemName: string, itemPrice: string }) {
        const itemCell = this.page.getByRole('cell', { name: `${expected.itemName}` });
        await expect(itemCell).toBeVisible();
        const itemRow = this.page.getByRole('row', { name: `${expected.itemName}` });
        await expect(itemRow.locator('bdi')).toHaveText(`${expected.itemPrice}`);
    }

    async placeOrder() {
        await this.placeOrderButton.click();
        await this.page.waitForLoadState();
    }
}