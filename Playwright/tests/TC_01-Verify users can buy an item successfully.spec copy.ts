import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { TodoPage } from '../page-objects/todo.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { Customer } from '../page-objects/Customer';
import { Item } from '../page-objects/Item';

test('Verify users can buy an item successfully', async ({ page }) => {
    const selectedItem: Item = new Item('DJI Mavic Pro Camera Drone', 129.00, 'High-performance camera drone with 4K video and advanced features.');


    const todoPage = new TodoPage(page);
    const loginPage = new LoginPage(page);
    //1. Open browser and go to https://demo.testarchitect.com/
    await todoPage.goToHomePage();
    //2. Login with valid credentials
    //Should we click on Login/Sign up button here or navigate to login page url?
    await loginPage.navigate();
    await loginPage.login('tamp@logigear.com', '123');
    //3. Navigate to All departments section
    //4. Select "Electronic Components & Supplies" 
    await todoPage.goToDepartment('Electronic Components & Supplies');
    //5. Verify the items should be displayed as a grid
    await todoPage.selectViewMode('grid');
    await expect(page.locator('.products-grid')).toBeVisible();
    //6. Switch view to list
    await todoPage.selectViewMode('list');
    //7. Verify the items should be displayed as a list
    await expect(page.locator('.products-list')).toBeVisible();
    //8. Select any item randomly to purchase
    //9. Click 'Add to cart' 
    await todoPage.addItemToCart(selectedItem.name);
    await page.waitForTimeout(3000);
    //10. Go to the cart
    await todoPage.goToCart();

    //11. Verify item details in mini content

    await expect(page.getByRole('cell', { name: `${selectedItem.name}` })).toBeVisible();
    await expect(page.getByRole('row', { name: `${selectedItem.name}` }).locator('bdi').nth(1)).toHaveText(`$${selectedItem.price}`);
    await expect(page.getByRole('spinbutton', { name: `${selectedItem.name}` })).toHaveValue('1');
    await expect(page.getByRole('row', { name: `${selectedItem.name}` }).locator('bdi').nth(2)).toHaveText(`$${selectedItem.price}`);

    //12. Click on Checkout
    await page.getByRole('link', { name: 'Proceed to checkout' }).click();

    //13. Verify Checkout page displays
    await expect(page).toHaveTitle('Checkout – TestArchitect Sample Website');
    //14. Verify item details in order
    await expect(page.getByRole('cell', { name: `${selectedItem}` })).toBeVisible();
    await expect(page.getByRole('row', { name: `${selectedItem}` }).locator('bdi')).toHaveText(`$${selectedItem.price}`);

    //15. Fill the billing details with default payment method

    await page.getByRole('textbox', { name: 'First name' }).fill('Tam');
    await page.getByRole('textbox', { name: 'Last name' }).fill('Phan');
    await page.getByRole('textbox', { name: 'Company name (optional)' }).fill('LogiGear');
    await page.getByRole('combobox', { name: 'Country / Region' }).click();
    await page.getByRole('option', { name: 'United States (US)', exact: true }).click();
    await page.getByRole('textbox', { name: 'Street address' }).fill('1234 Main St');
    await page.getByRole('textbox', { name: 'Town / City' }).fill('Houston');
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'Texas' }).click();
    await page.getByRole('textbox', { name: 'ZIP Code' }).fill('77072');
    await page.getByRole('textbox', { name: 'Phone' }).fill('0123456789');
    await page.getByRole('textbox', { name: 'Email address' }).fill('tamp@logigear.com');
    await page.getByRole('textbox', { name: 'Order notes' }).fill('testing');



    //16. Click on PLACE ORDER
    //17. Verify Order status page displays

    await page.getByRole('button', { name: 'Place order' }).click();
    await page.waitForLoadState();
    await expect(page).toHaveURL(/.*order-received.*/);
    //await page.waitForURL('https://demo.testarchitect.com/checkout/order-received**');
    //await page.goto('https://demo.testarchitect.com/checkout/order-received/14507/?key=wc_order_fw4Yfjitghc39');


    //18. Verify the Order details with billing and item information
    await page.waitForTimeout(3000);
    await expect(page.getByText('Thank you. Your order has')).toBeVisible();
    await expect(page.getByText('Order number:')).toBeVisible();

    // Get current date in "Month Day, Year" format
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Assert the date field displays the correct format
    await expect(page.getByText(`Date: ${formattedDate}`)).toBeVisible();

    await expect(page.getByText('Email: tamp@logigear.com')).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'Total: $' })).toHaveText(`${selectedItem.price}`);
    await expect(page.getByRole('listitem').filter({ hasText: 'Payment method: Direct bank' })).toBeVisible();



});