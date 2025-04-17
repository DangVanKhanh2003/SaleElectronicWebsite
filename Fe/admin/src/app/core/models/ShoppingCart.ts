import { Sale } from "./Sale"

export interface ShoppingCart {
    customerId: number
    productId: number
    amount: number
    colorId: number
  }

  export interface ItemShoppingCart {
    shoppingCartItemId: number
    customerId: number
    productId: number
    productName: string
    amount: number
    colorName: string
    brand: string
    series: string
    price: number
    categoryName: string
    mainImg: string
    sale: Sale
    colorId: number
    isCheck: boolean
  }