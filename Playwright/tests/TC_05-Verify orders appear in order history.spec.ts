import { test } from '@playwright/test';
import { TodoPage } from '../page-objects/todo.page';
import { LoginPage } from '../page-objects/login.page';
import { MyAccountPage } from '../page-objects/myAccount.page';


test.only('TC_05: Verify orders appear in order history', async ({ page }) => {
    test.setTimeout(100000);
    const todoPage = new TodoPage(page);
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);

    // Pre-condition: User has placed 02 orders 
    await todoPage.goToHomePage();
    await loginPage.navigate();
    await loginPage.login('tamp@logigear.com', '123');
    await todoPage.removeItemFromCart();

    // 1. Go to My Account page
    await todoPage.goToMyAccount();

    // 2. Click on Orders in left navigation
    await myAccountPage.goToOrders();

    // 3. Verify order details
    await myAccountPage.verifyOrderDetailsDisplay();
});