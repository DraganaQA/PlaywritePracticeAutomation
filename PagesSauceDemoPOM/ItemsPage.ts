import {Locator, Page} from '@playwright/test'

export class ItemsPage{

    readonly page: Page
    readonly burgerButton: Locator
    readonly logoutButton: Locator
    readonly shoppingCart: Locator
    readonly backpackAddToCart: Locator





    constructor(page: Page){
        this.page = page
        this.burgerButton = page.locator('#react-burger-menu-btn')
        this.logoutButton = page.locator('#logout_sidebar_link')
        this.shoppingCart = page.locator('.shopping_cart_link')
        this.backpackAddToCart = page.locator('#add-to-cart-sauce-labs-backpack')
        
    }

    //-------------------------------------------

    async clickOnBurgerButton(){
        this.burgerButton.click()
    }
    async clickOnLogoutButton(){
        this.logoutButton.click()
    }
    async clickOnShoppingCartButton(){
        this.shoppingCart.click()
    }
    async clickAddToCartBackpack(){
        this.backpackAddToCart.click()
    }


}