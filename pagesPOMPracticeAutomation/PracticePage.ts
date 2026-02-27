import { Locator, Page } from '@playwright/test'

export class PracticePage {

    readonly page: Page
    readonly testLoginPageButton: Locator

    constructor(page: Page) {
        this.page = page
        this.testLoginPageButton = page.locator('text=Test Login Page')
    }

    //----------------------------

    async clickOnTestLoginPage() {
        await this.testLoginPageButton.click()
    }


}