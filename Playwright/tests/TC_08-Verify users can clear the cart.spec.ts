import { test } from '@playwright/test';
import { TodoPage } from '../page-objects/todo.page';
import { LoginPage } from '../page-objects/login.page';
import { ShopPage } from '../page-objects/shop.page';
import { CartPage } from '../page-objects/cart.page';

test('TC_08: Verify users can clear the cart', async ({ page }) => {
    test.setTimeout(100000);
    const todoPage = new TodoPage(page);
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);
    const selectedItems = ['AirPods', 'Beats Studio Wireless Over-Ear', 'Velleman Vertex K 8400'];

    //Pre-condition: User added the items into cart
    // 1. Open browser and go to https://demo.testarchitect.com/
    await todoPage.goToHomePage();

    // 2. Login with valid credentials 
    await loginPage.navigate();
    await loginPage.login('tamp@logigear.com', '123');
    await todoPage.removeItemFromCart();

    // 3. Go to Shopping cart page
    await shopPage.openShop();

    // 4. Verify items show in table
    await shopPage.addMultipleItemsToCart(selectedItems);
    await todoPage.goToCart();
    await cartPage.verifyMultipleItemsInCart(selectedItems);

    // 5. Click on Clear shopping cart
    await cartPage.clearShoppingCart();

    // 6. Verify empty cart page displays. YOUR SHOPPING CART IS EMPTY displays
    await cartPage.verifyCartEmpty();
})