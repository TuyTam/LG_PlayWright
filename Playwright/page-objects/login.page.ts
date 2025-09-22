import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(private page: Page) {
        this.username = page.getByRole('textbox', { name: 'Username or email address *' });
        this.password = page.getByRole('textbox', { name: 'Password *' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    async navigate() {
        await this.page.goto('https://demo.testarchitect.com/my-account/');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
