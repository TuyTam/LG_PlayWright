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
        // const deptList = await this.page.getByText('Automobiles & Motorcycles Car').getByRole('link').all();
        // console.log('Total departments: ' + deptList);

        // for (let i = 0; i < await deptList.length; i++) {
        //     const text = await deptList[i].innerText();
        //     console.log(text);
        //     if (text.toLowerCase().includes(departmentName.toLowerCase())) {
        //         await deptList[i].click();
        //         break;
        //     }
        // }
    }

    async selectViewMode(viewMode: string) {
        if (viewMode === 'grid') {
            await this.page.locator('.switch-grid').click();
            await this.page.waitForURL('https://demo.testarchitect.com/product-category/electronic-components-supplies/?view_mode=grid');
        } else if (viewMode === 'list') {
            await this.page.locator('.switch-list').click();
            await this.page.waitForURL('https://demo.testarchitect.com/product-category/electronic-components-supplies/?view_mode=list');
        }
    }

    async addItemToCart(itemName: string) {
        await this.page.getByRole('link').filter({ hasText: `${itemName}` }).click();
        await this.page.waitForLoadState();
        await this.page.getByRole('button', { name: 'Add to cart' }).click();
        await this.page.waitForLoadState();

    }

    async goToCart() {
        await this.page.locator('.cart-type1').first().click();
        await this.page.waitForLoadState();
    }
}
