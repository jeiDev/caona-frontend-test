import { i18n } from "i18next"

export interface ObjectKeyDynamicI {
	[key: string]: string | number | object | any
}

export interface ObjectKeyStringReturnArrayOfStringI {
	[key: string]: Array<string>
}


export interface ErrorI {
	message: string
}


export interface ProviderGetOptionsI {
	notInclude?: string[]
	onlyParent?: boolean
	withOutPagination?: boolean
	companyUUID?: string
	branchOfficeUUID?: string
	cashRegisterUUID?: string
	warehouseUUID?: string
	filter?: ObjectKeyDynamicI
	search?: string
	dates?: {
		start: string,
		end: string
	}
	pagination?: {
		skip: number,
		take: number
	}
}

export interface ITranslator {
	t: ITranslatorFunction
	i18n: i18n
}

export interface ITranslatorFunction {
	(text: string): string
}

export type ExcludeProperties<T, K extends keyof T> = {
	[P in Exclude<keyof T, K>]: T[P]
}