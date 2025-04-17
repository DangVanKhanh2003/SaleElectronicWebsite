import { Category } from "./Categories"
import { Sale } from "./Sale"

export interface Product {
    productId: number
    productName: string
    brand: string
    series: string
    price: number
    category: Category
    mainImg: string
    typeImg: string
    sale: Sale
  }

export interface Specifiaction {
  specifiactionsId: number
  specType: string
  description: string
  productId: number
}

export interface ProductImg {
  imgId: number
  imgLink: string
  colorId: number
  productId: number
}
  
  
  