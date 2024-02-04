import { Entity, FieldConfigType } from "@interfaces/common/common.interface"

export type ModeType = 'create' | 'update'

export interface OptionIFieldConfigI {
	value: string
	label: string
}

export interface FieldConfig<T> {
	name: keyof T | 'divider' | 'blank'
	label: string
	type: FieldConfigType
    required?: boolean
    placeholder?: string
	options?: OptionIFieldConfigI[]
	disabled?: boolean
}

export interface IHandleSubmitModalForm<T>{
    (data: T, clear: () => void): void
}

export interface IModalFormProps<T>{
    subTitle: string
    mode: ModeType
    reference: string | number
    onlyShowLabelUpdate?: boolean
    loading?: boolean
    show: boolean
    entity: Entity<T>
    fields: FieldConfig<T>[]
    handleClose: () => void
    handleSave?: IHandleSubmitModalForm<T>
    handleUpdate?: IHandleSubmitModalForm<T>
}