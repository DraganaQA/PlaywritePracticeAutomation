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

    test('User can log in with valid credentials', async ({page}) => {
        await homePage.inputUserName('standard_user')
        await homePage.inputPassword('secret_sauce')
        await homePage.clickOnLogin()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await itemsPage.clickOnBurgerButton 
        await expect(itemsPage.logoutButton).toBeVisible
        await expect(itemsPage.shoppingCart).toBeVisible
    })

    test('User can not login with invalid username', async ({page}) => {
        await homePage.inputUserName('nostandard_user')
        await homePage.inputPassword('secret_sauce')
        await homePage.clickOnLogin()
        await expect(homePage.errorMessage).toBeVisible
        await expect(homePage.errorMessage).toContainText('Username and password do not match any user in this service')    
        //await expect(homePage.loginButton).toBeVisible
    })
    test('User can logout', async ({page}) =>{
        await homePage.inputUserName('standard_user')
        await homePage.inputPassword('secret_sauce')
        await homePage.clickOnLogin()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await itemsPage.clickOnBurgerButton 
        await itemsPage.clickOnLogoutButton
        const login = await page.locator('#login-button')      
        await expect(login).toBeVisible
        const shoppingCart = await page.locator('.shopping_cart_link')
        await expect(shoppingCart).not.toBeVisible
    })
    test.only('User can add items into shopping cart' , async ({page}) => {
        await homePage.inputUserName('standard_user')
        await homePage.inputPassword('secret_sauce')
        await homePage.clickOnLogin()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await itemsPage.clickAddToCartBackpack()
        const cartBadge = await page.locator('.shopping_cart_badge')
        await expect(cartBadge).toHaveText('1')
        await itemsPage.clickOnShoppingCartButton()
        const inventoryItem = await page.locator('.inventory_item_name')
        await expect(inventoryItem).toHaveText('Sauce Labs Backpack')
    })




})