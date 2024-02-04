import { ObjectKeyDynamicI } from "@interfaces/common/common.interface"
import { IGeneralPaginationResponse } from "@interfaces/pagination.interface"

export interface ICreateAddressRequest {
	address: string
	city: string
	state: string
	postal_code: string
	country: string
	client_id: number
}

export interface IUpdateAddressRequest extends ICreateAddressRequest {
	id: number
}

export interface IAddress {
	address: string
	city: string
	state: string
	postal_code: string
	country: string
	client_id: number
	id: number
}

export interface ICreateAddressResponse {
	data: IAddress
	errors: ObjectKeyDynamicI
}

export interface IUpdateAddressResponse extends ICreateAddressResponse {
	updated: boolean
}

export interface IGetManyAddressResponse {
	data: IAddress[]
	pagination: IGeneralPaginationResponse
	errors: ObjectKeyDynamicI
}

export interface IGetOneAddressResponse {
	data: IAddress
	errors: ObjectKeyDynamicI
}