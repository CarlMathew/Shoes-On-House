import React, { useState, type PropsWithChildren } from "react"


export interface QuantityButtonProps {
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>

}


export interface OrderProps extends QuantityButtonProps {
    orders: orderDetails[]
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
  shippingfee: number
  total: number

}


export type NavbarProps = {
    contentList: string[]
    order: orderDetails[]
}
