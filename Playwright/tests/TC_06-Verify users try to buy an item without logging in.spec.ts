import { test, expect } from '@playwright/test';
import { TodoPage } from '../page-objects/todo.page';
import { LoginPage } from '../page-objects/login.page';
import { ShopPage } from '../page-objects/shop.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { Customer } from '../page-objects/Customer';

test.only('TC_06: Verify users try to buy an item without logging in (As a guest)', async ({ page }) => {
    test.setTimeout(100000);
    const todoPage = new TodoPage(page);
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);
    const checkoutPage = new CheckoutPage(page);
    const customer = new Customer('Tam', 'Phan', 'tamp@logigear.com', '1234 Main St', 'Houston', 'Texas', '77072', 'United States (US)', '0123456789', 'LogiGear');
    const selectedItem = 'Beats Studio Wireless Over-Ear';

    // 1. Open https://demo.testarchitect.com/
    await todoPage.goToHomePage();

    // 2. Navigate to 'Shop' or 'Products' section
    await shopPage.openShop();

    // 3. Add a product to cart
    await shopPage.addItemToCart(selectedItem);

    // 4. Click on Cart button
    // 5. Proceed to complete order
    await todoPage.goToCheckOut();
    await checkoutPage.fillBillingInfo(customer, 'testing');
    await checkoutPage.placeOrder();

    //VP: Guests should be able to purchase the order successfully
    await checkoutPage.verifyOrderSuccess();

})




