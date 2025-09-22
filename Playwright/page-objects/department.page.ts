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
        return await expect(this.page).toHaveURL(/view_mode=grid/);
    }
    async verifyListView() {
        await this.listViewButton.click();
        return await expect(this.page).toHaveURL(/view_mode=list/);
    }

    async selectRandomItem(): Promise<{ name: string, price: string }> {
        const itemCount = await this.productItems.getByRole('heading').count();
        const randomIndex = Math.floor(Math.random() * itemCount);
        console.log(`Total items: ${itemCount} and random index: ${randomIndex}`);

        const name = await this.productItems.getByRole('heading').nth(randomIndex).innerText();
        //const name1 = await this.page.locator('.products-list').getByRole('heading').nth(10).innerText();
        const selectedItem = this.page.locator('.product-details').filter({ hasText: name });
        const price = await selectedItem.locator('bdi').count() > 1 ? await selectedItem.locator('bdi').nth(1).innerText() : await selectedItem.locator('bdi').first().innerText();

        console.log(`Selected item: ${name} - Price: ${price}`);
        await selectedItem.getByRole('link', { name: /Add/ }).click();
        await this.page.waitForTimeout(3000);

        return { name, price };
    }



}