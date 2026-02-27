import {Locator, Page} from '@playwright/test'

export class ProfilePage {

    readonly page: Page
    readonly logOutButton: Locator
    readonly loggedInMessage: Locator


    constructor(page:Page) {
        this.page = page
        this.logOutButton = page.locator('text=Log out')
        this.loggedInMessage = page.locator('.post-title')

    }

    //---------------------------------

    async clickOnLogOutButton() {
        this.logOutButton.click()
    }
}