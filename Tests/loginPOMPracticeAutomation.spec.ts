import {test, expect} from '@playwright/test'
import { HomePage } from '../pagesPOMPracticeAutomation/HomePage'
import { PracticePage} from '../pagesPOMPracticeAutomation/PracticePage'
import { LoginPage} from '../pagesPOMPracticeAutomation/LoginPage'
import { ProfilePage } from '../pagesPOMPracticeAutomation/ProfilePage'

test.describe('Login functionality', () =>{
    let loginPage : LoginPage
    let profilePage : ProfilePage
    let practicePage : PracticePage
    let homePage : HomePage


    test.beforeEach('Page set up', async ({ page}) =>{
        loginPage = new LoginPage(page)
        profilePage = new ProfilePage(page)
        practicePage = new PracticePage (page)
        homePage = new HomePage (page)

        await homePage.visit()
        await homePage.clickOnPracticeButton()
        await practicePage.clickOnTestLoginPage()
    })

    test('User can login' , async () =>{
        await loginPage.inputUsername('student')
        await loginPage.inputPassword('Password123')
        await loginPage.clickOnSubmitButton()
        await expect(profilePage.logOutButton).toBeVisible()
        await expect(profilePage.loggedInMessage).toBeVisible()
    })

    test('User can log out', async () =>{
        await loginPage.inputUsername('student')
        await loginPage.inputPassword('Password123')
        await loginPage.clickOnSubmitButton()
        await profilePage.clickOnLogOutButton()
        await expect(loginPage.submitButton).toBeVisible()
        await expect(profilePage.loggedInMessage).not.toBeVisible()
    })

    test('User cannot log in with invalid username @loginNegative', async() =>{
        await loginPage.inputUsername('InavildStudent')
        await loginPage.inputPassword('Password123')
        await loginPage.clickOnSubmitButton()
        await expect(loginPage.error).toBeVisible()
        await expect(loginPage.error).toHaveText('Your username is invalid!')
        await expect(loginPage.submitButton).toBeVisible()
        await expect(profilePage.loggedInMessage).not.toBeVisible()
    })

     test('User cannot log in with invalid password @loginNegative', async() =>{
        await loginPage.inputUsername('student')
        await loginPage.inputPassword('InvalidPassword123')
        await loginPage.clickOnSubmitButton()
        await expect(loginPage.error).toBeVisible()
        await expect(loginPage.error).toHaveText('Your password is invalid!')
        await expect(loginPage.submitButton).toBeVisible()
        await expect(profilePage.loggedInMessage).not.toBeVisible()
    })


})