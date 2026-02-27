import { test, expect } from '@playwright/test'

test.describe('Login functionality', () => {

    test.beforeEach('Go to login page', async ({ page }) => {
        await page.goto('https://practicetestautomation.com/')
        await page.click('text=Practice')
        await page.click('text=Test Login Page')
    })

    test('User can log in', async ({ page }) => {
        await page.fill('#username', 'student')
        await page.fill('#password', 'Password123')
        await page.click('#submit')
        await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/')
        const loggedInMessage = await page.locator('.post-title')
        await expect(loggedInMessage).toHaveText('Logged In Successfully')
        const loggedInNotification = await page.locator('.post-content')
        await expect(loggedInNotification).toContainText('student')
        const logOutButton = await page.locator('text=Log out')
        await expect(logOutButton).toBeVisible()
    })

    test('User cannot log in with invalid username', async ({ page }) => {
        await page.fill('#username', 'non-student')
        await page.fill('#password', 'Password123')
        await page.click('#submit')
        const error = await page.locator('#error:visible')
        await expect(error).toBeVisible()
        await expect(error).toHaveText('Your username is invalid!')
    })

    test('User cannot log in with invalid password', async ({ page }) => {
        await page.fill('#username', 'student')
        await page.fill('#password', 'password123')
        await page.click('#submit')
        const error = await page.locator('#error:visible')
        await expect(error).toBeVisible()
        await expect(error).toHaveText('Your password is invalid!')
    })
})