import { test } from '@playwright/test';
import { TodoPage } from '../page-objects/todo.page';
import { LoginPage } from '../page-objects/login.page';
import { ShopPage } from '../page-objects/shop.page';


test('TC_04: Verify users can sort items by price', async ({ page }) => {
    test.setTimeout(100000);
    const todoPage = new TodoPage(page);
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);

    // 1. Open browser and go to https://demo.testarchitect.com/
    await todoPage.goToHomePage();

    // 2. Login with valid credentials 
    await loginPage.navigate();
    await loginPage.login('tamp@logigear.com', '123');
    await todoPage.removeItemFromCart();

    // 3. Go to Shop page
    await shopPage.openShop();

    // 4.  Switch view to list
    await shopPage.selectViewMode('list');

    // 5. Sort items by price (low to high / high to low)
    // 6. Verify the order of items
    await shopPage.sortItemsByPrice('low to high');
    await shopPage.verifyOrderOfItems('low to high');

    await shopPage.sortItemsByPrice('high to low');
    await shopPage.verifyOrderOfItems('high to low');

})
