import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { TodoPage } from '../page-objects/todo.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { Customer } from '../page-objects/Customer';
import { ProductPage } from '../page-objects/product.page';
import { CartPage } from '../page-objects/cart.page';
import { DepartmentPage } from '../page-objects/department.page';
import { OrderStatusPage } from '../page-objects/orderStatus.page';
import { url } from 'inspector';

test('Verify users can buy an item successfully', async ({ page }) => {
    test.setTimeout(100000);
    const todoPage = new TodoPage(page);
    const loginPage = new LoginPage(page);
    const departmentPage = new DepartmentPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderStatusPage = new OrderStatusPage(page);
    const customer = new Customer('Tam', 'Phan', 'tamp@logigear.com', '1234 Main St', 'Houston', 'Texas', '77072', 'United States (US)', '0123456789', 'LogiGear');


    //1. Open browser and go to await page.goto('https://demo.testarchitect.com/');    
    await todoPage.goToHomePage();

    //2. Login with valid credentials
    await loginPage.navigate();
    await loginPage.login('tamp@logigear.com', '123');
    await todoPage.removeItemFromCart();

    //3. Navigate to All departments section
    //4. Select "Electronic Components & Supplies" 
    await departmentPage.navigateToDepartment('Electronic Components & Supplies');

    //5. Verify the items should be displayed as a grid
    await departmentPage.verifyGridView();

    //6. Switch view to list
    //7. Verify the items should be displayed as a list
    await departmentPage.verifyListView();

    //8. Select any item randomly to purchase
    //9. Click 'Add to cart' 
    const selectedItem: { name: string, price: string } = await departmentPage.selectRandomItem();

    //10. Go to the cart
    await todoPage.goToCart();

    //11. Verify item details in mini content
    await cartPage.verifyItemInCart({ itemName: selectedItem.name, itemPrice: selectedItem.price });

    //12. Click on Checkout
    await cartPage.proceedToCheckout();

    //13. Verify Checkout page displays
    await checkoutPage.verifyCheckoutPage();

    //14. Verify item details in order
    await checkoutPage.verifyOrderSummary({ itemName: selectedItem.name, itemPrice: selectedItem.price });

    //15. Fill the billing details with default payment method
    await checkoutPage.fillBillingInfo(customer, 'testing');
    await checkoutPage.selectPaymentMethod('Direct bank');

    //16. Click on PLACE ORDER
    await checkoutPage.placeOrder();

    //17. Verify Order status page displays
    await orderStatusPage.verifyOrderStatus();

    //18. Verify the Order details with billing and item information
    await orderStatusPage.verifyOrderDetails({ itemName: selectedItem.name, itemPrice: selectedItem.price, email: customer.email });

});