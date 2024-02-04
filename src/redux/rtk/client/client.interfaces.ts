import { ObjectKeyDynamicI } from "@interfaces/common/common.interface"
import { IGeneralPaginationResponse } from "@interfaces/pagination.interface"
import { IAddress } from "../address/address.interfaces"
import { IProfile } from "../profile/profile.interfaces"

export interface ICreateClientRequest {
	email: string
}

export interface IUpdateClientRequest extends ICreateClientRequest{
	id: number
}

export interface IClient {
	id: number
	email: string
	created_at: string
	updated_at: string
	deleted_at?: string
	address?: IAddress
	profile?: IProfile
}

export interface ICreateClientResponse {
	data: IClient
	errors: ObjectKeyDynamicI
}

export interface IUpdateClientResponse extends ICreateClientResponse {
	updated: boolean
}

export interface IGetManyClientResponse {
	data: IClient[]
	pagination: IGeneralPaginationResponse
	errors: ObjectKeyDynamicI
}

export interface IGetOneClientResponse {
	data: IClient
	errors: ObjectKeyDynamicI
}