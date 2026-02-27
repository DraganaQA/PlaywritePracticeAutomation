import {Locator, Page} from '@playwright/test'

export class HomePage{

readonly page: Page
readonly usernameField: Locator
readonly passwordField: Locator
readonly loginButton: Locator
readonly errorMessage: Locator

constructor(page: Page){
    this.page = page
    this.usernameField = page.locator('#user-name')
    this.passwordField = page.locator('#password')
    this.loginButton = page.locator('#login-button')
    this.errorMessage = page.locator('.error-message-container.error')
}
//------------------------
async inputUserName (username: string) {
    await this.usernameField.clear()
    await this.usernameField.fill(username)
}
async inputPassword (password: string) {
    await this.passwordField.clear()
    await this.passwordField.fill(password)
}
async clickOnLogin (){
    await this.loginButton.click()
}

}