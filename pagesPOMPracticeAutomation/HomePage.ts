import {Locator, Page} from '@playwright/test'

export class HomePage{

    readonly page: Page
    readonly practiceButton: Locator

    constructor(page: Page) {
        this.page = page
        this.practiceButton = page.locator('#menu-item-20')
    }

    //------------------------------------------

    async visit(){
        await this.page.goto('https://practicetestautomation.com/')
    }
    async clickOnPracticeButton(){
        await this.practiceButton.click()
    }
}