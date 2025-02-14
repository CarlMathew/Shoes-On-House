import React, { type PropsWithChildren } from "react"

export interface QuantityButtonProps {
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>,
    orders: orderDetails[]
    uid?: string | number
    ordersQuantity?: number | string | undefined
    handleOrder: (updateOrders: orderDetails[]) => void

}


export interface OrderProps extends QuantityButtonProps {
    orders: orderDetails[],
    openDialog: () => void
    setRemoveId: React.Dispatch<React.SetStateAction<number | string | null>>
    handleOrder: (updateOrders: orderDetails[]) => void

}

export interface CheckOutProps {
    orders:orderDetails[], 
    handleOrder: (orders: orderDetails[]) => void
}

export interface shopListInterface {
    readonly id: number,
    name: string,
    click: boolean,
    data: detailsInterface[] | null,
    description?: string | undefined
}

export interface DialogProps{
    dialogRef: React.RefObject<HTMLDialogElement>, 
    shoeSize: number | null | undefined,
    setShoeSize: React.Dispatch<React.SetStateAction<number | null | undefined>>, 
    idNumber: string
    orderList: orderDetails[]
    shoesData: detailsInterface[] | null
    handleOrder: (orders: orderDetails[]) => void
    clearAll: () => void
    closeModal: () => void
    
}

export interface RemoveDialogProps {
    dialogRef : React.RefObject<HTMLDialogElement>
    closeModal : () => void
    removeId: number | string | null
    orders:orderDetails[]
    shoesData?: detailsInterface[] | null
    handleOrder: (orders: orderDetails[]) => void
}


export interface detailsInterface {
    readonly id: number;
    name: string,
    imgURL: string
    price: number
}

export type BodyProps = PropsWithChildren<{

    orderData: orderDetails[]
    handleOrder: (orders: orderDetails[]) => void
    clearAll: () => void

}>

export interface sliderDetails {
    readonly id: number
    text: string,
    btnString: string,
    imgURL: string,
    position?: string 
}




export interface descriptionInterface{
    readonly id: number;
    name: string,
    imgURL: string
    description?: string
}

export interface orderDetails extends detailsInterface {
  size?: number | undefined
  quantity: number
  shippingfee?: number
  total?: number

}

export type NavbarProps = {
    contentList: string[]
    linkList: string[]
    order: orderDetails[]
}

export type PaymentProps = {
    orders: orderDetails[]
}
