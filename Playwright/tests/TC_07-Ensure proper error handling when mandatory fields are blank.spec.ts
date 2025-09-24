import { test } from '@playwright/test';
import { TodoPage } from '../page-objects/todo.page';
import { ShopPage } from '../page-objects/shop.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { Customer } from '../page-objects/Customer';

test('TC_07: Ensure proper error handling when mandatory fields are blank', async ({ page }) => {
    test.setTimeout(100000);
    const todoPage = new TodoPage(page);
    const shopPage = new ShopPage(page);
    const checkoutPage = new CheckoutPage(page);
    const customer = new Customer('Tam', 'Phan', 'tamp@logigear.com', '', '', 'Texas', '77072', 'United States (US)', '0123456789', 'LogiGear');
    const selectedItem = 'Beats Studio Wireless Over-Ear';

    // Pre-condition: User is at checkout
    await todoPage.goToHomePage();
    await shopPage.openShop();
    await shopPage.addItemToCart(selectedItem);
    await todoPage.goToCheckOut();

    //  1. Leave mandatory fields (address, payment info) blank
    await checkoutPage.fillBillingInfo(customer, 'testing');

    //  2. Click 'Confirm Order'
    await checkoutPage.placeOrder();

    //  3. Verify error messages. System should highlight missing fields and show an error message
    await checkoutPage.verifyErrorsOfMissingFields(['Street address', 'Town / City']);

})