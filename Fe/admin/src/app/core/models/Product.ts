import { CategoryResponse } from "./Categories"
import { Sale } from "./Sale"

export interface Product {
    productId: number
    productName: string
    brand: string
    series: string
    price: number
    category: CategoryResponse
    mainImg: string
    typeImg: string
    sale: Sale
  }

export interface SpecifiactionResponse {
  specifiactionsId: number
  specType: string
  description: string
  productId: number
}

export interface SpecificationRequest {
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
  

export interface productRequest {
  productName: string
  brand: string
  series: string
  price: number
  categoryId: number
  mainImg: string
  typeImg: string
}
  