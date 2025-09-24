import { test } from '@playwright/test';
import { TodoPage } from '../page-objects/todo.page';
import { LoginPage } from '../page-objects/login.page';
import { ShopPage } from '../page-objects/shop.page';
import { ProductPage } from '../page-objects/product.page';

test.only('TC_10: Verify users can post a review', async ({ page }) => {
    test.setTimeout(100000);
    const todoPage = new TodoPage(page);
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page);
    const itemName = 'Beats Studio Wireless Over-Ear';
    const reviewText = 'This is a test review2';
    const rating = '3';

    // 1. Open browser and go to https://demo.testarchitect.com/
    await todoPage.goToHomePage();

    // 2. Login with valid credentials 
    await loginPage.navigate();
    await loginPage.login('tamp@logigear.com', '123');
    await todoPage.removeItemFromCart();

    // 3. Go to Shop page
    await shopPage.openShop();

    // 4. Click on a product to view detail
    await shopPage.selectAnItem(itemName);

    // 5. Scroll down then click on REVIEWS tab
    // 6. Submit a review
    await productPage.submitReview(reviewText, rating);

    // 7. Verify new review
    await productPage.verifyReviewExists(reviewText, rating);

})