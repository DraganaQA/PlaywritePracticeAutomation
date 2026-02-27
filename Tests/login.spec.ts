import { test, expect } from '@playwright/test'
import { HomePage } from '../PagesSauceDemoPOM/HomePage'
import { CartPage } from '../PagesSauceDemoPOM/CartPage'
import { ItemsPage } from '../PagesSauceDemoPOM/ItemsPage'

test.describe('saucedemoFunctionalities', () =>{
    let homePage: HomePage
    let itemsPage: ItemsPage

    test.beforeEach('Go to the page', async ({page}) => {
        homePage = new HomePage(page)
        itemsPage = new ItemsPage(page)
        await page.goto("https://www.saucedemo.com/")

    })

    test.only('User can log in with valid credentials', async ({page}) => {
        await homePage.inputUserName('standard_user')
        await homePage.inputPassword('secret_sauce')
        await homePage.clickOnLogin()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await itemsPage.clickOnBurgerButton 
        await expect(itemsPage.logoutButton).toBeVisible
        await expect(itemsPage.shoppingCart).toBeVisible
    })

    test.only('User can not login with invalid username', async ({page}) => {
        await homePage.inputUserName('nostandard_user')
        await homePage.inputPassword('secret_sauce')
        await homePage.clickOnLogin()
        await expect(homePage.errorMessage).toBeVisible
        await expect(homePage.errorMessage).toContainText('Username and password do not match any user in this service')    
        //await expect(homePage.loginButton).toBeVisible
    })
    test('User can logout', async ({page}) =>{
        homePage.inputUserName('standard_user')
        homePage.inputPassword('secret_sauce')
        homePage.clickOnLogin
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        itemsPage.clickOnBurgerButton
        itemsPage.clickOnLogoutButton
        await expect(page).toHaveURL("https://www.saucedemo.com/")
        const login = await page.locator('#login-button')      
        await expect(login).toBeVisible
        const shoppingCart = await page.locator('.shopping_cart_link')
        await expect(shoppingCart).not.toBeVisible
    })
    test('User can add items into shopping cart' , async ({page}) => {
        homePage.inputUserName('standard_user')
        homePage.inputPassword('secret_sauce')
        homePage.clickOnLogin
        itemsPage.clickAddToCartBackpack
        const cartBadge = await page.locator('.shopping_cart_badge')
        await expect(cartBadge).toHaveText('1')
        itemsPage.clickOnShoppingCartButton

    })




})