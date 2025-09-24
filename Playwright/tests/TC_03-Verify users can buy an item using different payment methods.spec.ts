import { test, expect } from '@playwright/test';
import { todo } from 'node:test';
import { TodoPage } from '../page-objects/todo.page';
import { LoginPage } from '../page-objects/login.page';
import { ShopPage } from '../page-objects/shop.page';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { Customer } from '../page-objects/Customer';

test('TC_03: Verify users can buy an item using different payment methods', async ({ page }) => {
    test.setTimeout(100000);
    const todoPage = new TodoPage(page);
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const customer = new Customer('Tam', 'Phan', 'tamp@logigear.com', '1234 Main St', 'Houston', 'Texas', '77072', 'United States (US)', '0123456789', 'LogiGear');
    const selectedItem = 'Beats Studio Wireless Over-Ear';

    // 1. Open browser and go to https://demo.testarchitect.com/
    await todoPage.goToHomePage();

    // 2. Login with valid credentials 
    await loginPage.navigate();
    await loginPage.login('tamp@logigear.com', '123');
    await todoPage.removeItemFromCart();

    // 3. Go to Shop page
    await shopPage.openShop();

    // 4. Select an item and add to cart
    await shopPage.addItemToCart(selectedItem);

    // 5. Go to Checkout page
    await todoPage.goToCheckOut();

    // 6. Choose a different payment method (Direct bank transfer, Cash on delivery)
    // 7. Complete the payment process
    await checkoutPage.selectPaymentMethod('Cash on delivery');
    await checkoutPage.fillBillingInfo(customer, 'testing');
    await checkoutPage.placeOrder();

    //8. Verify order confirmation message
    await checkoutPage.verifyOrderSuccess();
});
