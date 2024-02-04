import { ObjectKeyDynamicI } from "@interfaces/common/common.interface"
import { IGeneralPaginationResponse } from "@interfaces/pagination.interface"

export interface ICreateProfileRequest {
	first_name: string
	last_name: string
	phone: string
	sexo: string
	client_id: number
}

export interface IUpdateProfileRequest extends ICreateProfileRequest {
	id: number
}

export interface IProfile {
	first_name: string
	last_name: string
	phone: string
	sexo: string
	client_id: number
	id: number
}

export interface ICreateProfileResponse {
	data: IProfile
	errors: ObjectKeyDynamicI
}

export interface IUpdateProfileResponse extends ICreateProfileResponse {
	updated: boolean
}

export interface IGetManyProfileResponse {
	data: IProfile[]
	pagination: IGeneralPaginationResponse
	errors: ObjectKeyDynamicI
}

export interface IGetOneProfileResponse {
	data: IProfile
	errors: ObjectKeyDynamicI
}