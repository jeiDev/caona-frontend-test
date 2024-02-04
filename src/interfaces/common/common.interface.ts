export interface ObjectKeyDynamicI {
	[key: string]: string | number | object | any
}

export type Entity<T> = {
	[key in keyof T]: any
}

export type FieldConfigType =
	| 'number'
	| 'text'
	| 'select'
	| 'date'
	| 'switch'
	| 'divider'
	| 'file'
	| 'password'
	| 'blank'
	| 'textarea'
	| 'creditcard'
	| 'tel'
	| 'autocomplete' 
	| 'email'
	| 'hidden'