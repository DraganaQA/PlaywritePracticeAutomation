import { test, expect } from '@playwright/test'

test.describe('Test scenario', () => {

    test('Prvi test', async ({ page }) => {
        await page.goto('https://practicetestautomation.com/')
        const title = await page.locator('.post-title')
        await expect(title).toBeVisible()
    })

    test('Test sa tagom @mojtag', async ({ page }) => {
        await page.goto('https://practicetestautomation.com/')
        const title = await page.locator('.post-title')
        await expect(title).toBeVisible()
    })

    test('Lokatori', async ({ page }) => {
        await page.goto('https://practicetestautomation.com/')

        // Po ID
        await page.locator('#main-container')

        // Po klasi
        await page.locator('.post-title')

        // Po tagu
        await page.locator('div')

        // Po tekstu
        await page.locator('text=Hello')

        // Po vidljivosti elementa
        await page.locator('.post-title:visible')

        // Po kombinaciji lokatora
        await page.locator('#menu-item-20 text=Practice')
    })

    test.only('Asertacije', async ({ page }) => {

        await page.goto('https://practicetestautomation.com/')
        await page.click('text=Practice')
        await page.click('text=Test Login Page')
        await page.fill('#username', 'student')
        await page.fill('#password', 'Password123')
        await page.click('#submit')

        //-------------------------

        // Asertujemo URL
        await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/')

        // Asertujemo title (onaj text unutar taba)
        await expect(page).toHaveTitle('Logged In Successfully | Practice Test Automation')

        // Asertujemo da li je text identican u elementu
        const loggedInMessage = await page.locator('.post-title')
        await expect(loggedInMessage).toHaveText('Logged In Successfully')

        // Asertujemo da li element sadrzi text
        const loggedInNotification = await page.locator('.post-content')
        await expect(loggedInNotification).toContainText('student')

        // Asertujemo da je element prisutan
        const logOutButton = await page.locator('text=Log out')
        await expect(logOutButton).toBeVisible()

        // Asertujemo da element nije prisutan
        const submitButton = await page.locator('#submit')
        await expect(submitButton).not.toBeVisible()

    })

    

})