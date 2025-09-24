import { test } from '@playwright/test';
import { TodoPage } from '../page-objects/todo.page';
import { LoginPage } from '../page-objects/login.page';
import { ShopPage } from '../page-objects/shop.page';
import { CartPage } from '../page-objects/cart.page';

test.only('TC_09: Verify users can update quantity of product in cart', async ({ page }) => {
    test.setTimeout(100000);
    const todoPage = new TodoPage(page);
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);
    const itemName = 'Beats Studio Wireless Over-Ear';
    const itemPrice: number = 150.00;
    const itemPlusPrice: number = itemPrice * 2;
    const itemx4Price: number = itemPrice * 4;
    const itemx3Price: number = itemPrice * 3;

    console.log(itemPrice, itemPlusPrice, itemx4Price, itemx3Price);
    // Pre-condition: User added an item into cart
    // 1. Open browser and go to https://demo.testarchitect.com/
    await todoPage.goToHomePage();

    // 2. Login with valid credentials 
    await loginPage.navigate();
    await loginPage.login('tamp@logigear.com', '123');
    await todoPage.removeItemFromCart();

    // 3. Go to Shop page
    await shopPage.openShop();

    // 4. Add a product
    await shopPage.addItemToCart(itemName);

    // 5. Go to the cart
    await todoPage.goToCart();

    // 6. Verify quantity of added product
    await cartPage.verifyItemQuantityAndSubTotal(itemName, { quantity: '1', subTotal: `$${itemPrice.toFixed(2)}` });

    // 7. Click on Plus(+) button
    await cartPage.increaseQuantityByPlus1(itemName);

    // 8. Verify quantity of product and SUB TOTAL price
    await cartPage.verifyItemQuantityAndSubTotal(itemName, { quantity: '2', subTotal: `$${itemPlusPrice.toFixed(2)}` });

    // 9. Enter 4 into quantity textbox then click on UPDATE CART button
    await cartPage.enterQuantity(itemName, '4');

    // 10. Verify quantity of product is 4 and SUB TOTAL price
    await cartPage.verifyItemQuantityAndSubTotal(itemName, { quantity: '4', subTotal: `$${itemx4Price.toFixed(2)}` });

    // 11. Click on Minus(-) button
    await cartPage.decreaseQuantityByMinus1(itemName);

    // 12. Verify quantity of product and SUB TOTAL price
    await cartPage.verifyItemQuantityAndSubTotal(itemName, { quantity: '3', subTotal: `$${itemx3Price.toFixed(2)}` });

})