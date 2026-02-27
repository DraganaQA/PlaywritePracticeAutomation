import {Locator, Page} from '@playwright/test'

export class LoginPage {

    readonly page: Page
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly submitButton: Locator
    readonly error: Locator
    
    constructor(page: Page){
        this.page = page
        this.usernameField = page.locator('#username')
        this.passwordField = page.locator('#password')
        this.submitButton = page.locator('#submit')
        this.error = page.locator('#error')
    }

    //-----------------------------------


    async inputUsername(usernmae: string){
        await this.usernameField.fill(usernmae)
    }
    async inputPassword(password: string){
        await this.passwordField.fill(password)
    }
    async clickOnSubmitButton(){
        await this.submitButton.click()
    }
    
}