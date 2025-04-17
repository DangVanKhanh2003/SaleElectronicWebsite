import { ColorResponse } from "./Color"
import { Product } from "./Product"
import { Store } from "./Store"

export interface OrderResponse {
    orderId: number
    customerId: number
    customerName: string
    employeeId: number
    employeeName: string
    odertDate: string
    store: Store
    status: string
    orderType: string
    dateExport: Date
    orderPendingId: number
    listProductOrder: ListProductOrderResponse[]
  }

  export interface ListProductOrderResponse {
    productOrderId: number
    orderId: number
    product: Product
    amount: number
    color: ColorResponse
    untilPrice: number
  }