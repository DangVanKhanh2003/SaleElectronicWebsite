import { Sale } from "./Sale"

export interface OrderPendingRequest {
    customerId: number
    listProductOrederPending: ListProductOrederPendingRequest[]
  }
  
  export interface ListProductOrederPendingRequest {
    productId: number
    amount: number
    colorId: number
  }


export interface OrderPendingResponse {
  orderPendingId: number
  customerName: string
  customerId: number
  employeeId: number
  employeeName: string
  odertDate: string
  status: string
  listProductOrederPending: ListProductOrederPendingResponse[]
}

export interface ListProductOrederPendingResponse {
  productOrderPendingId: number
  productId: number
  productName: string
  amount: number
  colorName: string
  brand: string
  series: string
  price: number
  categoryName: string
  mainImg: string
  sale?: Sale
}
  