import { Locator, Page, expect } from "@playwright/test";

export class DepartmentPage {
    private allDepartmentsLink: Locator;
    private categoryLink: (departmentName: string) => Locator;
    private gridViewButton: Locator;
    private listViewButton: Locator;
    private productItems: Locator;

    constructor(private page: Page) {
        this.allDepartmentsLink = this.page.getByText('All departments');
        this.categoryLink = (departmentName: string) => this.page.getByText('Automobiles & Motorcycles Car').getByRole('link').filter({ hasText: departmentName });
        this.gridViewButton = this.page.locator('.switch-grid');
        this.listViewButton = this.page.locator('.switch-list');
        this.productItems = this.page.locator('.products-list');
    }




    async navigateToDepartment(departmentName: string) {
        await this.allDepartmentsLink.click();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(1000);
        await this.categoryLink(departmentName).click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyGridView() {
        await this.gridViewButton.click();
        await this.page.waitForURL('https://demo.testarchitect.com/product-category/electronic-components-supplies/?view_mode=grid');
        return expect(this.page.locator('.products-grid')).toBeVisible();
    }
    async verifyListView() {
        await this.listViewButton.click();
        await this.page.waitForURL('https://demo.testarchitect.com/product-category/electronic-components-supplies/?view_mode=list');
        return expect(this.page.locator('.products-list')).toBeVisible();
    }

    async selectRandomItem(): Promise<{ name: string, price: string }> {
        const itemCount = await this.productItems.getAttribute('data-row-count');
        console.log('Total items: ' + itemCount);
        const randomIndex = Math.floor(Math.random() * parseInt(itemCount!));
        const item = this.productItems.getByRole('heading').nth(randomIndex);

        const name = await item.getByRole('link').innerText();
        console.log('Selected item name: ' + name);


        let price: string;



        if (await this.page.getByRole('link', { name: `${name}` }).getByRole('insertion').isVisible()) {
            price = await this.page.getByText(name).getByRole('insertion').locator('bdi').innerText();
            console.log('Price found in insertion tag: ' + price);
        } else {
            price = await this.productItems.locator('bdi').nth(randomIndex).innerText();
            console.log('Price found in bdi tag: ' + price);
        }

        console.log(`Selected item: ${name} - Price: ${price}`);

        await item.click();

        return { name, price };
    }



}